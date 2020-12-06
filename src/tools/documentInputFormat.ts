const formatDocument = (documentNoFormated:string) => {
  let docFormated = documentNoFormated
    .replace(/\./g, "")
    .replace(/\-/g, "")
    .replace(/\//g, "");


  if (docFormated.length === 14 || docFormated.length === 11) return docFormated;
  else return "Invalid"

};


export {formatDocument}
