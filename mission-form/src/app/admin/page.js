"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import styled from "styled-components";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  text-align: center; /* Garante que tudo dentro do container fique centralizado */
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centraliza a tabela horizontalmente */
  width: 100%;
`;

const Table = styled.table`
  width: auto; /* Ajuste para que a tabela tenha apenas a largura necessária */
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

const DownloadButton = styled.button`
  display: block;
  margin: 30px auto;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;

// Função para gerar CSV
const downloadCSV = (missions) => {
  const headers = [
    "ID",
    "Cidade",
    "Pastor Presidente",
    "Tipo de Seleção",
    "País/Estado",
    "Nome do Missionário",
    "Valor de Ajuda Mensal (R$)",
    "Tempo de Ajuda",
    "Enviado pela Igreja?",
    "Recebe Ajuda?",
    "Origem da Ajuda",
  ];

  const rows = missions.map((mission) => [
    mission.id,
    mission.city,
    mission.pastor_name,
    mission.selection_type,
    mission.country || mission.state,
    mission.missionary_name,
    mission.help_value ? `R$ ${mission.help_value.toFixed(2)}` : "N/A",
    mission.missionary_time,
    mission.missionary_sent_by_church ? "Sim" : "Não",
    mission.receives_help ? "Sim" : "Não",
    mission.help_origin || "N/A",
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((row) => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "missions_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const generateDOCX = async (mission) => {
  try {
    console.log("Tentando baixar e preencher o modelo .docx");

    // Carregar o arquivo de modelo .docx
    const response = await fetch("/FICHA_USUARIO.docx");

    if (!response.ok) {
      throw new Error("Não foi possível carregar o modelo .docx");
    }

    const templateData = await response.arrayBuffer();
    const zip = new PizZip(templateData);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    console.log("Arquivo modelo carregado com sucesso");

    // Preencher os campos no documento com base nos dados da missão
    doc.setData({
      nome_do_campo: mission.city || "N/A",
      pastor_nome: mission.pastor_name || "N/A",
      rams: mission.receives_help ? "X" : " ",
      ramn: !mission.receives_help ? "X" : " ",
      pais_internacional: mission.country || "N/A",
      missionario_internacional: mission.missionary_name || "N/A",
      valor_ajuda_internacional: mission.help_value
        ? `R$ ${mission.help_value.toFixed(2)}`
        : "N/A",
      tai1: mission.missionary_time === "1 ano" ? "X" : " ",
      tai2: mission.missionary_time === "2 anos" ? "X" : " ",
      tai3: mission.missionary_time === "3 anos" ? "X" : " ",
      taii: mission.missionary_time === "indeterminado" ? "X" : " ",
      mies: mission.missionary_sent_by_church ? "X" : " ",
      mien: !mission.missionary_sent_by_church ? "X" : " ",
      cidade_nacional: mission.city || "N/A",
      uf_nacional: mission.state || "N/A",
      missionario_nacional: mission.missionary_name || "N/A",
      valor_ajuda_nacional: mission.help_value
        ? `R$ ${mission.help_value.toFixed(2)}`
        : "N/A",
      tan1: mission.missionary_time === "1 ano" ? "X" : " ",
      tan2: mission.missionary_time === "2 anos" ? "X" : " ",
      tan3: mission.missionary_time === "3 anos" ? "X" : " ",
      tani: mission.missionary_time === "indeterminado" ? "X" : " ",
      mnes: mission.missionary_sent_by_church ? "X" : " ",
      mnen: !mission.missionary_sent_by_church ? "X" : " ",
    });

    // Renderizar o documento com os dados preenchidos
    doc.render();
    console.log("Campos preenchidos com sucesso");

    // Gerar e baixar o arquivo .docx preenchido
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `Ficha_${mission.city}.docx`);

    console.log("Arquivo baixado com sucesso");
  } catch (error) {
    console.error("Erro ao gerar o documento DOCX:", error);

    if (error.properties && error.properties.errors) {
      console.error("Detalhes do erro:", error.properties.errors);
    }
  }
};

export default function AdminPage() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchMissions();
  }, []);

  if (loading) {
    return <Loading>Carregando dados...</Loading>;
  }

  return (
    <Container>
      <LogoWrapper>
        <img
          src="/SEMADERGS.png"
          alt="Logo Semadergs"
          width={300}
          height={80}
        />
      </LogoWrapper>
      <TableWrapper>
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
              <Th>Recebe Ajuda?</Th>
              <Th>Origem da Ajuda</Th>
              <Th>Ficha</Th>
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
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(mission.help_value)
                    : "N/A"}
                </Td>
                <Td>{mission.missionary_time}</Td>
                <Td>{mission.missionary_sent_by_church ? "Sim" : "Não"}</Td>
                <Td>{mission.receives_help ? "Sim" : "Não"}</Td>
                <Td>{mission.help_origin || "N/A"}</Td>
                <Td>
                  <Button onClick={() => generateDOCX(mission)}>
                    Baixar Ficha
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>

      {/* Botão para baixar os dados em CSV */}
      <DownloadButton onClick={() => downloadCSV(missions)}>
        Baixar Dados em CSV
      </DownloadButton>
    </Container>
  );
}
