import { redirect } from 'next/navigation'


const LandingPage = async () => {
  redirect('/login')
};

export default LandingPage;
