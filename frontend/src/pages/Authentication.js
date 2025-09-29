import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async({request}) => {
  // console.log(request);
  const searchparams = new URL(request.url).searchParams;
  const mode = searchparams.get('mode') || 'login';
  if (mode !== 'login' && mode !== 'signup') {
    return new Response(JSON.stringify({message: 'Unsuporetd mode.'}), {status: 422});
  }
  const data = await request.formData();
  const authdata = {
    email: data.get('email'),
    password: data.get('password')
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authdata)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    new Response(JSON.stringify({message: 'Could not authenticate.'}), {status: 500});
  }
  const resData = await response.json();
  const token = resData.token;
  sessionStorage.setItem('token', token); 
  let expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  sessionStorage.setItem('expiration', expiration.toISOString());
  return redirect('/')
};