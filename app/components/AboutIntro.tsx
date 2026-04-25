import Reveal from "./Reveal";

export default function AboutIntro() {
  return (
    <section className="py-32 px-8 md:px-16 max-w-[1440px] mx-auto bg-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-8">
          {/* تغليف العنوان الرئيسي */}
          <Reveal>
            <h2 className="font-['Epilogue'] text-3xl md:text-[50px] leading-[1.2] tracking-tight text-stone-900 font-medium">
              Helping brands to stand out in the digital era. Together we will
              set the new status quo.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-4 flex flex-col items-start md:items-end space-y-12">
          {/* تغليف النص الجانبي مع تأخير بسيط */}
          <Reveal delay={0.4}>
            <p className="font-['Epilogue'] text-lg text-stone-500 leading-relaxed max-w-[300px] md:text-right">
              The combination of my passion for design, code & interaction
              positions me in a unique place.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
