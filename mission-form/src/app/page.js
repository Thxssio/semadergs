"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// Estilização dos componentes
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('/background.svg') no-repeat center center;
  background-size: cover;
  padding: 20px;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  margin: 0 20px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #555;
  font-size: 16px;
  margin: 20px 0 12px;
  font-weight: 500;
  cursor: pointer;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #333;
`;

// Componentes refatorados para as seções
const InternationalSection = ({ showInternational }) => {
  if (!showInternational) return null;
  return (
    <div>
      <Label>Nome do Missionário:</Label>
      <Input type="text" name="missionaryNameInternational" placeholder="Nome do Missionário" />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input type="number" name="helpValueInternational" placeholder="Valor de Ajuda Mensal (R$)" />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Input type="text" name="missionaryTimeInternational" placeholder="Selecione o tempo..." />

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Input type="text" name="missionarySentByChurch" placeholder="Selecione..." />
    </div>
  );
};

const NationalSection = ({ showNational }) => {
  if (!showNational) return null;
  return (
    <div>
      <Label>Estado:</Label>
      <Input type="text" name="state" placeholder="Selecione o estado..." />

      <Label>Município:</Label>
      <Input type="text" name="municipality" placeholder="Selecione o município..." />

      <Label>Nome do Missionário:</Label>
      <Input type="text" name="missionaryNameNational" placeholder="Nome do Missionário" />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input type="number" name="helpValueNational" placeholder="Valor de Ajuda Mensal (R$)" />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Input type="text" name="missionaryTimeNational" placeholder="Selecione o tempo..." />

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Input type="text" name="missionarySentByChurchNational" placeholder="Selecione..." />
    </div>
  );
};

// Componente principal
export default function MissionForm() {
  const [city, setCity] = useState('');  // Caixa de texto para a cidade
  const [pastorName, setPastorName] = useState('');
  const [selectionType, setSelectionType] = useState('');
  const [showInternational, setShowInternational] = useState(false);
  const [showNational, setShowNational] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    checkFields();
  };

  const handlePastorNameChange = (e) => {
    setPastorName(e.target.value);
    checkFields();
  };

  const checkFields = () => {
    if (city && pastorName) {
      setShowInternational(selectionType === 'international' || selectionType === 'both');
      setShowNational(selectionType === 'national' || selectionType === 'both');
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <LogoWrapper>
          <Image src="/SEMADERGS.png" alt="Logo SEMADERGS" width={180} height={50} />
        </LogoWrapper>

        <Label>Campo (Cidade do RS):</Label>
        <Input
          type="text"
          name="city"
          placeholder="Digite o nome da cidade..."
          value={city}
          onChange={handleCityChange}
        />

        <Label>Nome do Pastor Presidente:</Label>
        <Input
          type="text"
          name="pastorName"
          placeholder="Nome do Pastor Presidente"
          value={pastorName}
          onChange={handlePastorNameChange}
        />

        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="selectionType"
              value="international"
              checked={selectionType === 'international'}
              onChange={() => setSelectionType('international')}
            />{' '}
            Internacional
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="selectionType"
              value="national"
              checked={selectionType === 'national'}
              onChange={() => setSelectionType('national')}
            />{' '}
            Nacional
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="selectionType"
              value="both"
              checked={selectionType === 'both'}
              onChange={() => setSelectionType('both')}
            />{' '}
            Ambos
          </RadioLabel>
        </RadioGroup>

        <SectionTitle onClick={() => setShowInternational(!showInternational)}>
          Detalhamento de Ajuda Missionária Internacional {showInternational ? '-' : '+'}
        </SectionTitle>
        <InternationalSection showInternational={showInternational} />

        <SectionTitle onClick={() => setShowNational(!showNational)}>
          Detalhamento de Ajuda Missionária Nacional {showNational ? '-' : '+'}
        </SectionTitle>
        <NationalSection showNational={showNational} />

        <Button type="submit">Enviar</Button>
      </FormWrapper>
    </PageWrapper>
  );
}
