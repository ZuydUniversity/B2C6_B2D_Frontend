import { redirect } from 'next/navigation'


const LandingPage = async () => {
  redirect('/dashboard')
};

export default LandingPage;
