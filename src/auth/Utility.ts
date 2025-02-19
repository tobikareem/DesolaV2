
export const generatePKCE = async () => {
    const codeVerifier = [...crypto.getRandomValues(new Uint8Array(32))]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    sessionStorage.setItem("pkce_code_verifier", codeVerifier);
    return codeChallenge;
};
