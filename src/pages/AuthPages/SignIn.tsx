import { useParams } from 'react-router-dom';
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import StudioSearch from "../../components/auth/StudioSearch";

export default function SignIn() {
  const { studioId } = useParams();

  return (
    <>
      <PageMeta
        title={studioId ? "Studio Sign In" : "Find Your Studio"}
        description={studioId ? "Sign in to your studio account" : "Search and select your studio to sign in"}
      />
      <AuthLayout>
        {studioId ? <SignInForm /> : <StudioSearch />}
      </AuthLayout>
    </>
  );
}
