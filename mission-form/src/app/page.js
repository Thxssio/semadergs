"use client";
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import Image from 'next/image'; 

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que o contêiner cubra toda a altura da tela */
  background: url('/background.svg') no-repeat center center; /* Remove o fixed */
  background-size: cover; /* Garante que a imagem cubra toda a área */
  padding: 20px;
  box-sizing: border-box;

  /* Estilos específicos para dispositivos móveis */
  @media (max-width: 768px) {
    background-size: cover; /* Cobre toda a tela em dispositivos móveis */
    background-position: center top; /* Centraliza a imagem no topo */
  }

  @media (max-width: 480px) {
    background-size: auto; /* Aumenta o zoom da imagem em telas menores */
    background-position: center top; /* Centraliza a imagem no topo */
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Fundo semi-transparente */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  margin: 0 20px; /* Adiciona um espaço ao redor para evitar o corte */
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

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #333;
`;

const CollapsibleSection = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: ${props => (props.isVisible ? '1000px' : '0')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
`;

const StyledSelect = styled(Select)`
  margin-bottom: 12px;

  .react-select__control {
    border-radius: 6px;
    border-color: #ddd;
    background-color: #fff;
    color: #333;
    min-height: 38px;
    &:hover {
      border-color: #007bff;
    }
  }

  .react-select__menu {
    background-color: #ffffff !important;
  }

  .react-select__option {
    background-color: #ffffff !important;
    color: #333333 !important;
    &:hover {
      background-color: #007bff !important;
      color: #ffffff !important;
    }
  }

  .react-select__single-value {
    color: #333 !important;
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




const citiesOfRS = [
  { value: 'porto_alegre', label: 'Porto Alegre' },
  { value: 'caxias_do_sul', label: 'Caxias do Sul' },
  { value: 'pelotas', label: 'Pelotas' },
  { value: 'santa_maria', label: 'Santa Maria' },
  { value: 'gravatai', label: 'Gravataí' },
  // Adicione todas as outras cidades aqui
];

const countriesByContinent = {
  Africa: ['Nigeria', 'Egypt', 'South Africa'],
  Europe: ['Germany', 'France', 'Spain'],
  Asia: ['China', 'Japan', 'India'],
  // Adicione mais continentes e países aqui
};

const statesOfBrazil = ['Acre', 'Bahia', 'Ceará', 'São Paulo', 'Rio de Janeiro'];
const municipalitiesByState = {
  Acre: ['Rio Branco', 'Cruzeiro do Sul'],
  Bahia: ['Salvador', 'Feira de Santana'],
  // Adicione mais estados e municípios aqui
};

export default function MissionForm() {
  const [selectedCity, setSelectedCity] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectionType, setSelectionType] = useState('');
  const [showSections, setShowSections] = useState(false);
  const [showInternational, setShowInternational] = useState(false);
  const [showNational, setShowNational] = useState(false);

  const handleCityChange = (selected) => {
    setSelectedCity(selected.value);
    checkFields();
  };

  const handlePastorNameChange = (e) => {
    setPastorName(e.target.value);
    checkFields();
  };

  const checkFields = () => {
    if (selectedCity && pastorName) {
      setShowSections(true);
    }
  };

  const handleSelectionTypeChange = (type) => {
    setSelectionType(type);
    setShowInternational(type === 'international' || type === 'both');
    setShowNational(type === 'national' || type === 'both');
  };


  return (
    <PageWrapper>
      <FormWrapper>
        <LogoWrapper>
          <Image src="/SEMADERGS-Black.svg" alt="Logo SEMADERGS" width={200} height={100} />
        </LogoWrapper>

        <Label>Campo (Cidade do RS):</Label>
        <StyledSelect
          className="custom-react-select"
          options={citiesOfRS}
          onChange={handleCityChange}
          placeholder="Selecione a cidade..."
        />

        <Label>Nome do Pastor Presidente:</Label>
        <Input
          type="text"
          name="pastorName"
          placeholder="Nome do Pastor Presidente"
          value={pastorName}
          onChange={handlePastorNameChange}
        />

        {showSections && (
          <>
          <RadioGroup>
              <RadioLabel>
                <input
                  type="radio"
                  name="selectionType"
                  value="international"
                  checked={selectionType === 'international'}
                  onChange={() => handleSelectionTypeChange('international')}
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
                />{' '}
                Ambos
              </RadioLabel>
            </RadioGroup>

            {selectionType && (
              <>
                {showInternational && (
                  <>
                    <SectionTitle onClick={() => setShowInternational(!showInternational)}>
                      Detalhamento de Ajuda Missionária Internacional {showInternational ? '▲' : '▼'}
                    </SectionTitle>
                    <CollapsibleSection isVisible={showInternational}>
                      <Label>Continente:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={Object.keys(countriesByContinent).map(continent => ({ value: continent, label: continent }))}
                        onChange={(selected) => setSelectedContinent(selected.value)}
                        placeholder="Selecione o continente..."
                      />

                      <Label>País:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={selectedContinent && countriesByContinent[selectedContinent]
                          ? countriesByContinent[selectedContinent].map(country => ({
                              value: country,
                              label: country
                            }))
                          : []}
                        onChange={(selected) => setSelectedContinent(selected.value)}
                        placeholder="Selecione o país..."
                      />

                      <Label>Nome do Missionário:</Label>
                      <Input type="text" name="missionaryNameInternational" placeholder="Nome do Missionário" />

                      <Label>Valor de Ajuda Mensal (R$):</Label>
                      <Input type="number" name="helpValueInternational" placeholder="Valor de Ajuda Mensal (R$)" />

                      <Label>Tempo de Ajuda Missionária:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={[
                          { value: '1 ano', label: '01 ano' },
                          { value: '2 anos', label: '02 anos' },
                          { value: 'tempo indeterminado', label: 'Tempo Indeterminado' }
                        ]}
                        placeholder="Selecione o tempo..."
                      />

                      <Label>O missionário foi enviado pela sua Igreja?</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={[
                          { value: 'sim', label: 'SIM' },
                          { value: 'nao', label: 'NÃO' }
                        ]}
                        placeholder="Selecione..."
                      />
                    </CollapsibleSection>
                  </>
                )}

                {showNational && (
                  <>
                    <SectionTitle onClick={() => setShowNational(!showNational)}>
                      Detalhamento de Ajuda Missionária Nacional {showNational ? '▲' : '▼'}
                    </SectionTitle>
                    <CollapsibleSection isVisible={showNational}>
                      <Label>Estado:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={statesOfBrazil.map(state => ({ value: state, label: state }))}
                        onChange={(selected) => setSelectedCity(selected.value)}
                        placeholder="Selecione o estado..."
                      />

                      <Label>Município:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={selectedCity && municipalitiesByState[selectedCity]
                          ? municipalitiesByState[selectedCity].map(municipality => ({
                              value: municipality,
                              label: municipality
                            }))
                          : []}
                        onChange={(selected) => setSelectedCity(selected.value)}
                        placeholder="Selecione o município..."
                      />

                      <Label>Nome do Missionário:</Label>
                      <Input type="text" name="missionaryNameNational" placeholder="Nome do Missionário" />

                      <Label>Valor de Ajuda Mensal (R$):</Label>
                      <Input type="number" name="helpValueNational" placeholder="Valor de Ajuda Mensal (R$)" />

                      <Label>Tempo de Ajuda Missionária:</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={[
                          { value: '1 ano', label: '01 ano' },
                          { value: '2 anos', label: '02 anos' },
                          { value: 'tempo indeterminado', label: 'Tempo Indeterminado' }
                        ]}
                        placeholder="Selecione o tempo..."
                      />

                      <Label>O missionário foi enviado pela sua Igreja?</Label>
                      <StyledSelect
                        className="custom-react-select"
                        options={[
                          { value: 'sim', label: 'SIM' },
                          { value: 'nao', label: 'NÃO' }
                        ]}
                        placeholder="Selecione..."
                      />
                    </CollapsibleSection>
                  </>
                )}

                <Button type="submit">Enviar</Button>
              </>
            )}
          </>
        )}
      </FormWrapper>
    </PageWrapper>
  );
}