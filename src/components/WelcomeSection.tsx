import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="text-[rgba(250,249,246,1)] mt-[303px] max-md:max-w-full max-md:mt-10">
      <div className="flex flex-col items-stretch justify-center max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <header className="w-full font-bold max-md:max-w-full">
            <h1 className="text-2xl max-md:max-w-full">
              Welcome to
            </h1>
            <h2 className="text-5xl max-md:max-w-full max-md:text-[40px]">
              ClimateSage
            </h2>
          </header>
          <p className="text-sm font-normal mt-2 max-md:max-w-full">
            Easily track and report your Environmental, Social, and Governance
            impact—no jargon, no hassle,{" "}
            <em>just insights that matter</em>
            .
          </p>
        </div>
        <p className="text-sm font-normal mt-6">
          Have an account?{" "}
          <a 
            href="/signin" 
            className="underline text-[rgba(253,188,138,1)] hover:text-[rgba(253,188,138,0.8)] transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/05b1fd79d26f448994095c75ce8963d4/47251796dd879d4ee53bffce79008089d55db834?placeholderIfAbsent=true"
        alt="ClimateSage illustration"
        className="aspect-[0.76] object-contain w-[229px] max-w-full mt-[117px] max-md:mt-10"
      />
    </section>
  );
};

export default WelcomeSection;
