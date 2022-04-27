import CredentialSection from '../../components/CredentialSection';

const Login = (props) => {
  return (
    <CredentialSection name="login" onSubmit={props.onSubmit} />
  );
};

export default Login;
