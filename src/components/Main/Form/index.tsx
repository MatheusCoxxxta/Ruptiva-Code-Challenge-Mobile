import React, { useState } from "react";
import { Handle, StyleSheet, View, ActivityIndicator } from "react-native";
import {
  FormLabel,
  InputGroup,
  FormInput,
  FormButton,
  ButtonText,
  WarningLabel,
} from "./style";
import { TextInputMask } from "react-native-masked-text";
import { formatDocument } from "../../../tools/documentInputFormat";
import { EvilIcons } from "@expo/vector-icons";

const Form = (props: {
  handle: (name: string, document: string) => void;
  loading: boolean;
}) => {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [requireName, setRequireName] = useState("");
  const [requireDocument, setRequireDocument] = useState("");

  /**
   * handleForm (props.handle)
   * @param
   */

  const handleForm = () => {
    let docFormated: string = formatDocument(document);

    if (!name) setRequireName("Insira um nome!");
    if (!document) setRequireDocument("Insira um CPF ou CNPJ!");
    if (docFormated === "Invalid")
      setRequireDocument("Insira um CPF ou CNPJ válido!");

    if (name && (docFormated.length === 11 || docFormated.length === 14)) {
      props.handle(name, docFormated);
      setName("");
      setDocument("");
      setRequireName("");
      setRequireDocument("");
    }
  };

  return (
    <View style={styles.container}>
      <FormLabel>Nome</FormLabel>
      <InputGroup>
        <FormInput
          placeholder="Insira seu nome"
          value={name}
          onChangeText={(value: string) => setName(value)}
        />
      </InputGroup>
      {requireName && !name ? (
        <WarningLabel> {requireName} </WarningLabel>
      ) : null}
      <FormLabel>Documento</FormLabel>
      <InputGroup>
        <TextInputMask
          style={styles.documentInput}
          type={document.length < 14 ? "cpf" : "cnpj"}
          placeholder="Insira CPF ou CNPJ"
          value={document}
          onChangeText={(value) => setDocument(value)}
        />
      </InputGroup>
      {requireDocument ? (
        <WarningLabel> {requireDocument} </WarningLabel>
      ) : null}

      <InputGroup>
        {props.loading ? (
          <ActivityIndicator size="small" color="#8888af" />
        ) : (
          <FormButton>
            <ButtonText onPress={handleForm}>Cadastrar</ButtonText>
          </FormButton>
        )}
      </InputGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
    marginBottom: 50,
  },

  documentInput: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
});

export default Form;
