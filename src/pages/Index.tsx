import React from 'react';
import WelcomeSection from '@/components/WelcomeSection';
import SignUpForm from '@/components/SignUpForm';

const Index: React.FC = () => {
  return (
    <main className="bg-[rgba(53,80,78,1)] flex items-stretch gap-[40px_100px] overflow-hidden flex-wrap min-h-screen">
      <aside className="flex-1 min-w-0 px-8 lg:px-16">
        <WelcomeSection />
      </aside>
      
      <section className="bg-[rgba(250,249,246,1)] shadow-[0px_0px_24px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden justify-center px-20 py-[218px] max-md:max-w-full max-md:px-5 max-md:py-[100px] flex-shrink-0">
        <SignUpForm />
      </section>
    </main>
  );
};

export default Index;
