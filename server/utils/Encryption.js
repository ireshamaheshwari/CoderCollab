const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5KJnkjapkNanJrskjkeusvke"

function decodeJWT(token) {
    // Split the token into its three parts
    const [header, payload, signature] = token.split('.');
  
    // Decode the base64-encoded header and payload
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
  
    // Return the decoded header and payload as an object
    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature
    };
  }
  
module.exports = {SECRET_KEY , decodeJWT}
