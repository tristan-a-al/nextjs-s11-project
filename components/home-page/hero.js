import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/tristan.jpeg"
          alt="An image showing Tristan"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Tristan</h1>
      <p>I like cheese.</p>
    </section>
  );
}

export default Hero;
