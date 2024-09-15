"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { supabase } from './supabaseClient';  // Importar o cliente do Supabase

// Estilização dos componentes
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('background.svg') no-repeat center center;
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

// Função para enviar os dados ao Supabase
const submitDataToSupabase = async (data) => {
  const { error } = await supabase.from('missions').insert([data]);
  if (error) {
    console.error('Erro ao enviar os dados:', error);
    return false;
  }
  return true;
};

// Componentes refatorados para as seções
const InternationalSection = ({ handleBooleanChange, handleChange, formData }) => {
  return (
    <div>
      <Label>País:</Label>
      <Input
        type="text"
        name="country"
        placeholder="Digite o país..."
        value={formData.country}
        onChange={handleChange}
        required
      />

      <Label>Nome do Missionário:</Label>
      <Input
        type="text"
        name="missionary_name"
        placeholder="Nome do Missionário"
        value={formData.missionary_name}
        onChange={handleChange}
        required
      />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input
        type="number"
        name="help_value"
        placeholder="Valor de Ajuda Mensal (R$)"
        value={formData.help_value}
        onChange={handleChange}
        required
      />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select
        name="missionary_time"
        value={formData.missionary_time}
        onChange={handleChange}
        required
      >
        <option value="">Selecione o tempo de ajuda...</option>
        <option value="1 ano">1 ano</option>
        <option value="2 anos">2 anos</option>
        <option value="3 anos">3 anos</option>
        <option value="indeterminado">Indeterminado</option>
      </Select>

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Select
        name="missionary_sent_by_church"
        value={formData.missionary_sent_by_church}
        onChange={handleBooleanChange}
        required
      >
        <option value="">Selecione...</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Select>
    </div>
  );
};

const NationalSection = ({ handleBooleanChange, handleChange, formData }) => {
  return (
    <div>
      <Label>Estado:</Label>
      <Input
        type="text"
        name="state"
        placeholder="Digite o estado..."
        value={formData.state}
        onChange={handleChange}
        required
      />

      <Label>Município:</Label>
      <Input
        type="text"
        name="municipality"
        placeholder="Digite o município..."
        value={formData.municipality}
        onChange={handleChange}
        required
      />

      <Label>Nome do Missionário:</Label>
      <Input
        type="text"
        name="missionary_name"
        placeholder="Nome do Missionário"
        value={formData.missionary_name}
        onChange={handleChange}
        required
      />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input
        type="number"
        name="help_value"
        placeholder="Valor de Ajuda Mensal (R$)"
        value={formData.help_value}
        onChange={handleChange}
        required
      />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select
        name="missionary_time"
        value={formData.missionary_time}
        onChange={handleChange}
        required
      >
        <option value="">Selecione o tempo de ajuda...</option>
        <option value="1 ano">1 ano</option>
        <option value="2 anos">2 anos</option>
        <option value="3 anos">3 anos</option>
        <option value="indeterminado">Indeterminado</option>
      </Select>

      <Label>O missionário foi enviado pela sua Igreja?</Label>
      <Select
        name="missionary_sent_by_church"
        value={formData.missionary_sent_by_church}
        onChange={handleBooleanChange}
        required
      >
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
  const [formData, setFormData] = useState({
    missionary_name: '',
    help_value: '',
    missionary_time: '',
    country: '',
    state: '',
    municipality: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleInvalidInput = (event) => {
    if (event.target.name === "city") {
      event.target.setCustomValidity("Por favor, digite o nome da cidade.");
    } else if (event.target.name === "pastorName") {
      event.target.setCustomValidity("Por favor, digite o nome do pastor presidente.");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!city || !pastorName || (!showInternational && !showNational)) {
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    const data = {
      city,
      pastor_name: pastorName,
      selection_type: selectionType,
      missionary_name: formData.missionary_name,
      help_value: formData.help_value,
      missionary_time: formData.missionary_time,
      country: formData.country,
      state: formData.state,
      municipality: formData.municipality,
      missionary_sent_by_church: missionarySentByChurch === true,
    };

    const success = await submitDataToSupabase(data);
    setIsLoading(false);

    if (success) {
      setShowAlert(false);
      setShowPopup(true); // Exibir o popup após enviar o formulário
    } else {
      setShowAlert(true);
    }
  };

  const handleNewForm = () => {
    setCity('');
    setPastorName('');
    setFormData({
      missionary_name: '',
      help_value: '',
      missionary_time: '',
      country: '',
      state: '',
      municipality: '',
    });
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
                <InternationalSection
                  handleBooleanChange={handleBooleanChange}
                  handleChange={handleChange}
                  formData={formData}
                />
              )}

              {showNational && (
                <SectionTitle onClick={() => toggleSection('national')}>
                  Detalhamento de Ajuda Missionária Nacional {showNational ? '-' : '+'}
                </SectionTitle>
              )}
              {showNational && (
                <NationalSection
                  handleBooleanChange={handleBooleanChange}
                  handleChange={handleChange}
                  formData={formData}
                />
              )}
            </>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
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