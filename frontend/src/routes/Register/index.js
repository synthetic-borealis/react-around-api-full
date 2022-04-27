import CredentialSection from '../../components/CredentialSection';

const Register = (props) => {
  return (
    <CredentialSection name="signup" onSubmit={props.onSubmit} />
  );
};

export default Register;
