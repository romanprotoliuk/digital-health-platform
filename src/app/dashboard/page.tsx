"use client";

import UserInfo from "components/UserInfo";
import { NextRequest, NextResponse } from "next/server";
import { useSession, GetSessionParams } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from "components/LogoutButton";

import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export const loader = async ({ request }: { request: NextRequest }) => {
    const session = await getSession({ req: request as unknown as GetSessionParams['req'] });
  

    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  
    return new Response(JSON.stringify({ session }), {
      headers: { 'Content-Type': 'application/json' },
    });
  };

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is not authenticated, redirect them to the home page
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Optionally, show a loading state while checking the session
  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  console.log(session);

  return (
    <div>
      <h1>Dashboard</h1>
    
      <LogoutButton />
      {/* other dashboard content */}
    </div>
  );
}
