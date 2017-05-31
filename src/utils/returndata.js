const CreateReData = (code,redata,message) => {
  return {
    "Code": code,
    "Message":message,
    "ReData":redata
  }
}

module.exports = CreateReData;