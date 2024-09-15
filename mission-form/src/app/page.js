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

const Select = styled.select`
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

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  z-index: 1000;
  text-align: center;
  max-width: 400px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.4s ease-in-out forwards;

  h2 {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: 0;
  animation: fadeInOverlay 0.4s ease-in-out forwards;

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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

const AlertBox = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
`;

// Componentes refatorados para as seções
const InternationalSection = ({ handleBooleanChange }) => {
  return (
    <div>
      <Label>País:</Label>
      <Input type="text" name="countryInternational" placeholder="Digite o país..." required />

      <Label>Nome do Missionário:</Label>
      <Input type="text" name="missionaryNameInternational" placeholder="Nome do Missionário" required />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input type="number" name="helpValueInternational" placeholder="Valor de Ajuda Mensal (R$)" required />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select name="missionaryTimeInternational" required>
        <option value="">Selecione o tempo de ajuda...</option>
        <option value="1 ano">1 ano</option>
        <option value="2 anos">2 anos</option>
        <option value="3 anos">3 anos</option>
        <option value="indeterminado">Indeterminado</option>
      </Select>

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Select name="missionarySentByChurch" onChange={handleBooleanChange} required>
        <option value="">Selecione...</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Select>
    </div>
  );
};

const NationalSection = ({ handleBooleanChange }) => {
  return (
    <div>
      <Label>Estado:</Label>
      <Input type="text" name="state" placeholder="Digite o estado..." required />

      <Label>Município:</Label>
      <Input type="text" name="municipality" placeholder="Digite o município..." required />

      <Label>Nome do Missionário:</Label>
      <Input type="text" name="missionaryNameNational" placeholder="Nome do Missionário" required />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input type="number" name="helpValueNational" placeholder="Valor de Ajuda Mensal (R$)" required />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select name="missionaryTimeNational" required>
        <option value="">Selecione o tempo de ajuda...</option>
        <option value="1 ano">1 ano</option>
        <option value="2 anos">2 anos</option>
        <option value="3 anos">3 anos</option>
        <option value="indeterminado">Indeterminado</option>
      </Select>

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Select name="missionarySentByChurchNational" onChange={handleBooleanChange} required>
        <option value="">Selecione...</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Select>
    </div>
  );
};


// Componente principal
export default function MissionForm() {
  const [city, setCity] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [selectionType, setSelectionType] = useState('');
  const [showInternational, setShowInternational] = useState(false);
  const [showNational, setShowNational] = useState(false);
  const [missionarySentByChurch, setMissionarySentByChurch] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInvalidInput = (event) => {
    if (event.target.name === "city") {
      event.target.setCustomValidity("Por favor, digite o nome da cidade.");
    } else if (event.target.name === "pastorName") {
      event.target.setCustomValidity("Por favor, digite o nome do pastor presidente.");
    } else if (event.target.name === "missionaryNameInternational") {
      event.target.setCustomValidity("Por favor, digite o nome do missionário.");
    } else if (event.target.name === "helpValueInternational") {
      event.target.setCustomValidity("Por favor, digite o valor de ajuda mensal.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleBooleanChange = (e) => {
    setMissionarySentByChurch(e.target.value === "true");
  };

  const handleSelectionTypeChange = (type) => {
    setSelectionType(type);
    setShowInternational(type === 'international' || type === 'both');
    setShowNational(type === 'national' || type === 'both');
  };

  const toggleSection = (section) => {
    if (section === 'international') {
      if (showInternational) {
        setSelectionType('');
      }
      setShowInternational(!showInternational);
    } else if (section === 'national') {
      if (showNational) {
        setSelectionType('');
      }
      setShowNational(!showNational);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city || !pastorName || (!showInternational && !showNational)) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    setShowPopup(true); // Exibir o popup após enviar o formulário
  };

  const handleNewForm = () => {
    setCity('');
    setPastorName('');
    setSelectionType('');
    setShowInternational(false);
    setShowNational(false);
    setShowPopup(false); // Fechar o popup e resetar o formulário
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <LogoWrapper>
          <Image src="/SEMADERGS.png" alt="Logo SEMADERGS" width={180} height={60} />
        </LogoWrapper>

        {showAlert && (
          <AlertBox>Por favor, preencha todos os campos obrigatórios.</AlertBox>
        )}

        <form onSubmit={handleSubmit}>
          <Label>Campo (Cidade do RS):</Label>
          <Input
            type="text"
            name="city"
            placeholder="Digite o nome da cidade..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onInvalid={handleInvalidInput}
            required
          />

          <Label>Nome do Pastor Presidente:</Label>
          <Input
            type="text"
            name="pastorName"
            placeholder="Nome do Pastor Presidente"
            value={pastorName}
            onChange={(e) => setPastorName(e.target.value)}
            onInvalid={handleInvalidInput}
            required
          />

          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="selectionType"
                value="international"
                checked={selectionType === 'international'}
                onChange={() => handleSelectionTypeChange('international')}
                onInvalid={handleInvalidInput}
                required
              />{' '}
              Internacional
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="selectionType"
                value="national"
                checked={selectionType === 'national'}
                onChange={() => handleSelectionTypeChange('national')}
                onInvalid={handleInvalidInput}
                required
              />{' '}
              Nacional
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="selectionType"
                value="both"
                checked={selectionType === 'both'}
                onChange={() => handleSelectionTypeChange('both')}
                onInvalid={handleInvalidInput}
                required
              />{' '}
              Ambos
            </RadioLabel>
          </RadioGroup>

          {selectionType && (
            <>
              {showInternational && (
                <SectionTitle onClick={() => toggleSection('international')}>
                  Detalhamento de Ajuda Missionária Internacional {showInternational ? '-' : '+'}
                </SectionTitle>
              )}
              {showInternational && (
                <InternationalSection handleBooleanChange={handleBooleanChange} />
              )}

              {showNational && (
                <SectionTitle onClick={() => toggleSection('national')}>
                  Detalhamento de Ajuda Missionária Nacional {showNational ? '-' : '+'}
                </SectionTitle>
              )}
              {showNational && (
                <NationalSection handleBooleanChange={handleBooleanChange} />
              )}
            </>
          )}

          <Button type="submit">Enviar</Button>
        </form>
      </FormWrapper>

      {showPopup && (
        <>
          <Overlay />
          <Popup>
            <h2>Obrigado!</h2>
            <p>Seu formulário foi enviado com sucesso.</p>
            <ButtonStyled onClick={handleNewForm}>Preencher novo formulário</ButtonStyled>
          </Popup>
        </>
      )}
    </PageWrapper>
  );
}
