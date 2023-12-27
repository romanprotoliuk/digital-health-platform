// src/pages/dashboard.tsx
import { signIn, getSession } from 'next-auth/react';
import { type Session } from 'next-auth';
import { type GetServerSideProps } from 'next';

const Dashboard: React.FC<{ session: Session }> = ({ session }) => {

  const handleConnectToStrava = async () => {
    try {
      await signIn('strava'); // Strava provider needs to be set up in NextAuth
      // Handle successful connection
    } catch (error) {
      // Handle error case
      console.error('Error connecting to Strava:', error);
    }
  };
  
  console.log(session)

  return (
    <div>
        {session ? (
        <>
            <p>Welcome, {session.user.name}</p>
            <button onClick={handleConnectToStrava}>Connect to Strava</button>
            {/* Render additional user-specific dashboard elements */}
        </>
        ) : (
        <p>Please log in to view the dashboard.</p>
        )}
  </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession({ req: context.req });

  if (!session) {
    // Redirect user to login page if not authenticated
    return {
      redirect: {
        destination: '/login', // Your login route
        permanent: false,
      },
    };
  }

  // If there is a session, return it as a prop to the page
  return {
    props: { session },
  };
};

export default Dashboard;
