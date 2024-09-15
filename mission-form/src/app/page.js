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
  display: flex;
  justify-content: space-between;
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

const submitDataToSupabase = async (data) => {
  const { error } = await supabase.from('missions').insert([data]);
  if (error) {
    console.error('Erro ao enviar os dados:', error);
    return false;
  }
  return true;
};

// Componentes refatorados para as seções
const InternationalSection = ({ handleInternationalChange, formDataInternational }) => {
  return (
    <div>
      <Label>País:</Label>
      <Input
        type="text"
        name="country"
        placeholder="Digite o país..."
        value={formDataInternational.country}
        onChange={handleInternationalChange}
        required
      />

      <Label>Nome do Missionário:</Label>
      <Input
        type="text"
        name="missionary_name"
        placeholder="Nome do Missionário"
        value={formDataInternational.missionary_name}
        onChange={handleInternationalChange}
        required
      />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input
        type="number"
        name="help_value"
        placeholder="Valor de Ajuda Mensal (R$)"
        value={formDataInternational.help_value}
        onChange={handleInternationalChange}
        required
      />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select
        name="missionary_time"
        value={formDataInternational.missionary_time}
        onChange={handleInternationalChange}
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
        value={formDataInternational.missionary_sent_by_church}
        onChange={handleInternationalChange}
        required
      >
        <option value="">Selecione...</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Select>
    </div>
  );
};

const NationalSection = ({ handleNationalChange, formDataNational }) => {
  return (
    <div>
      <Label>Estado:</Label>
      <Input
        type="text"
        name="state"
        placeholder="Digite o estado..."
        value={formDataNational.state}
        onChange={handleNationalChange}
        required
      />

      <Label>Município:</Label>
      <Input
        type="text"
        name="municipality"
        placeholder="Digite o município..."
        value={formDataNational.municipality}
        onChange={handleNationalChange}
        required
      />

      <Label>Nome do Missionário:</Label>
      <Input
        type="text"
        name="missionary_name"
        placeholder="Nome do Missionário"
        value={formDataNational.missionary_name}
        onChange={handleNationalChange}
        required
      />

      <Label>Valor de Ajuda Mensal (R$):</Label>
      <Input
        type="number"
        name="help_value"
        placeholder="Valor de Ajuda Mensal (R$)"
        value={formDataNational.help_value}
        onChange={handleNationalChange}
        required
      />

      <Label>Tempo de Ajuda Missionária:</Label>
      <Select
        name="missionary_time"
        value={formDataNational.missionary_time}
        onChange={handleNationalChange}
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
        value={formDataNational.missionary_sent_by_church}
        onChange={handleNationalChange}
        required
      >
        <option value="">Selecione...</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </Select>
    </div>
  );
};


const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.checked ? '#007bff' : '#ccc')};
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.checked ? 'translateX(26px)' : 'none')};
  }
`;

const SwitchInput = styled.input`
  display: none;
`;

const HelpOriginWrapper = styled.div`
  margin-top: 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const HelpMissionaryField = ({ receivesHelp, setReceivesHelp, helpOrigin, setHelpOrigin }) => {
  return (
    <>
      <ToggleWrapper>
        <Label>O campo recebe ajuda missionária?</Label>
        <Switch>
          <SwitchInput 
            type="checkbox" 
            checked={receivesHelp || false}  // Garantir valor booleano
            onChange={() => setReceivesHelp(!receivesHelp)} 
          />
          <Slider checked={receivesHelp}></Slider>
        </Switch>
      </ToggleWrapper>

      <HelpOriginWrapper visible={receivesHelp}>
        <Label>Origem da ajuda missionária:</Label>
        <Input
          type="text"
          name="helpOrigin"
          placeholder="Digite a origem da ajuda..."
          value={helpOrigin}
          onChange={(e) => setHelpOrigin(e.target.value)}
        />
      </HelpOriginWrapper>
    </>
  );
};


export default function MissionForm() {
  const [city, setCity] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [selectionType, setSelectionType] = useState('');
  const [showInternational, setShowInternational] = useState(false);
  const [showNational, setShowNational] = useState(false);
  const [missionarySentByChurch, setMissionarySentByChurch] = useState(null);
  const [receivesHelp, setReceivesHelp] = useState(false);
  const [helpOrigin, setHelpOrigin] = useState('');

  const [formDataInternational, setFormDataInternational] = useState({
    missionary_name: '',
    help_value: '',
    missionary_time: '',
    country: '',
    missionary_sent_by_church: '',
  });
  const [formDataNational, setFormDataNational] = useState({
    missionary_name: '',
    help_value: '',
    missionary_time: '',
    state: '',
    municipality: '',
    missionary_sent_by_church: '',
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

  const handleInternationalChange = (e) => {
    const { name, value } = e.target;
    setFormDataInternational((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNationalChange = (e) => {
    const { name, value } = e.target;
    setFormDataNational((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectionTypeChange = (type) => {
    setSelectionType(type);
    setShowInternational(type === 'international' || type === 'both');
    setShowNational(type === 'national' || type === 'both');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!city || !pastorName || (!showInternational && !showNational)) {
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    // Dados internacionais
    const internationalData = {
      city,
      pastor_name: pastorName,
      receives_help: receivesHelp, 
      help_origin: receivesHelp ? helpOrigin : null,
      selection_type: 'international',
      missionary_name: formDataInternational.missionary_name,
      help_value: formDataInternational.help_value,
      missionary_time: formDataInternational.missionary_time,
      country: formDataInternational.country,
      missionary_sent_by_church: formDataInternational.missionary_sent_by_church === "true",
    };

    // Dados nacionais
    const nationalData = {
      city,
      pastor_name: pastorName,
      receives_help: receivesHelp, 
      help_origin: receivesHelp ? helpOrigin : null,
      selection_type: 'national',
      missionary_name: formDataNational.missionary_name,
      help_value: formDataNational.help_value,
      missionary_time: formDataNational.missionary_time,
      state: formDataNational.state,
      municipality: formDataNational.municipality,
      missionary_sent_by_church: formDataNational.missionary_sent_by_church === "true",
    };

    if (selectionType === 'both') {
      const successInternational = await submitDataToSupabase(internationalData);
      const successNational = await submitDataToSupabase(nationalData);
      if (successInternational && successNational) {
        setShowAlert(false);
        setShowPopup(true);
      } else {
        setShowAlert(true);
      }
    } else if (selectionType === 'international') {
      const success = await submitDataToSupabase(internationalData);
      if (success) {
        setShowAlert(false);
        setShowPopup(true); 
      } else {
        setShowAlert(true);
      }
    } else if (selectionType === 'national') {
      const success = await submitDataToSupabase(nationalData);
      if (success) {
        setShowAlert(false);
        setShowPopup(true); 
      } else {
        setShowAlert(true);
      }
    }

    setIsLoading(false);
  };

  const handleNewForm = () => {
    setCity('');
    setPastorName('');
    setFormDataInternational({
      missionary_name: '',
      help_value: '',
      missionary_time: '',
      country: '',
      missionary_sent_by_church: '',
    });
    setFormDataNational({
      missionary_name: '',
      help_value: '',
      missionary_time: '',
      state: '',
      municipality: '',
      missionary_sent_by_church: '',
    });
    setSelectionType('');
    setShowInternational(false);
    setShowNational(false);
    setShowPopup(false); 
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

          <HelpMissionaryField
            receivesHelp={receivesHelp}
            setReceivesHelp={setReceivesHelp}
            helpOrigin={helpOrigin}
            setHelpOrigin={setHelpOrigin}
          />

          {city && pastorName && (
            <>
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

              {selectionType === 'international' || selectionType === 'both' ? (
                <>
                  <SectionTitle onClick={() => setShowInternational(!showInternational)}>
                    Detalhamento de Ajuda Missionária Internacional {showInternational ? '-' : '+'}
                  </SectionTitle>
                  {showInternational && (
                    <InternationalSection
                      handleInternationalChange={handleInternationalChange}
                      formDataInternational={formDataInternational}
                    />
                  )}
                </>
              ) : null}

              {selectionType === 'national' || selectionType === 'both' ? (
                <>
                  <SectionTitle onClick={() => setShowNational(!showNational)}>
                    Detalhamento de Ajuda Missionária Nacional {showNational ? '-' : '+'}
                  </SectionTitle>
                  {showNational && (
                    <NationalSection
                      handleNationalChange={handleNationalChange}
                      formDataNational={formDataNational}
                    />
                  )}
                </>
              ) : null}
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
