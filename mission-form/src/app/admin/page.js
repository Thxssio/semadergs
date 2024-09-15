"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import styled from "styled-components";
import Papa from "papaparse";  // Importando papaparse para exportação em CSV
import Image from "next/image";  // Importando Image para exibir a logo

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;

const Thead = styled.thead`
  background-color: #007bff;
  color: white;
  text-align: center;
`;

const Tbody = styled.tbody`
  text-align: center;
  background-color: #f9f9f9;
`;

const Th = styled.th`
  padding: 15px;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 3px solid #007bff;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Loading = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: #555;
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function AdminPage() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados iniciais da tabela
  const fetchMissions = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("missions").select("*");
    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      setMissions(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Busca os dados iniciais
    fetchMissions();

    // Inscreve-se para ouvir eventos em tempo real
    const subscription = supabase
      .channel("realtime-missions")  // Nome do canal
      .on(
        "postgres_changes", 
        { event: "*", schema: "public", table: "missions" }, 
        (payload) => {
          console.log("Mudança detectada:", payload);
          fetchMissions(); // Atualiza os dados ao receber um evento
        }
      )
      .subscribe();

    // Limpa a inscrição quando o componente for desmontado
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Função para gerar o CSV com os dados das missões
  const downloadCSV = () => {
    const csv = Papa.unparse(missions, {
      header: true,
      columns: [
        "id",
        "city",
        "pastor_name",
        "selection_type",
        "country",
        "missionary_name",
        "help_value",
        "missionary_time",
        "missionary_sent_by_church",
        "receives_help",    // Novo campo
        "help_origin",      // Novo campo
      ],
    });

    // Criar um link de download temporário
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "dados_semadergs.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <Loading>Carregando dados...</Loading>;
  }

  return (
    <Container>
      <LogoWrapper>
        <Image
          src="/SEMADERGS.png"  // Caminho da sua imagem
          alt="Logo Semadergs"
          width={300}  // Defina a largura desejada
          height={80}  // Defina a altura desejada
        />
      </LogoWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Cidade</Th>
            <Th>Pastor Presidente</Th>
            <Th>Tipo de Seleção</Th>
            <Th>País / Estado</Th>
            <Th>Nome do Missionário</Th>
            <Th>Valor de Ajuda Mensal (R$)</Th>
            <Th>Tempo de Ajuda</Th>
            <Th>Enviado pela Igreja?</Th>
            <Th>Recebe Ajuda?</Th>  {/* Nova coluna */}
            <Th>Origem da Ajuda</Th>  {/* Nova coluna */}
          </Tr>
        </Thead>
        <Tbody>
          {missions.map((mission) => (
            <Tr key={mission.id}>
              <Td>{mission.id}</Td>
              <Td>{mission.city}</Td>
              <Td>{mission.pastor_name}</Td>
              <Td>{mission.selection_type}</Td>
              <Td>{mission.country || mission.state}</Td>
              <Td>{mission.missionary_name}</Td>
              <Td>
                {mission.help_value 
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mission.help_value) 
                  : "N/A"}
              </Td>  {/* Formatação do valor de ajuda mensal */}
              <Td>{mission.missionary_time}</Td>
              <Td>{mission.missionary_sent_by_church ? "Sim" : "Não"}</Td>
              <Td>{mission.receives_help ? "Sim" : "Não"}</Td> {/* Nova coluna */}
              <Td>{mission.help_origin || "N/A"}</Td> {/* Nova coluna */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={downloadCSV}>Baixar Dados em CSV</Button>
    </Container>
  );
}
