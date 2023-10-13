import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
type FormValues = {
  bill: number;
  people: number;
  tip: number;
};
export default function Home() {
  const { register, watch, setValue, reset } = useForm<FormValues>();
  const [customTip, setcustomTip] = useState("0");
  const [isCustomActive, setIsCustomActive] = useState(false);
  const handleTipSelection = (tipPercentage: number) => {
    setValue("tip", tipPercentage);
    setIsCustomActive(false);
  };
  const currentValues = watch();
  const totalTip =
    currentValues.bill && currentValues.tip && currentValues.people
      ? (
          (Number(currentValues.bill) * currentValues.tip) /
          Number(currentValues.people)
        ).toFixed(2)
      : "0.00";
  const totalBillPerPerson =
    currentValues.bill && currentValues.tip && currentValues.people
      ? (
          (Number(currentValues.bill) +
            Number(currentValues.bill) * currentValues.tip) /
          Number(currentValues.people)
        ).toFixed(2)
      : "0.00";
  console.log(totalTip, totalBillPerPerson);

  return (
    <>
      <Head>
        <title>Splitter</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article>
        <Image
          src={"images/logo.svg"}
          alt="Logo"
          width="87"
          height="54"
          className="mx-auto my-11"
        />
        <form className="Fm:grid Fm:grid-cols-2 Fm:h-[480px] Fm:gap-11 flex h-screen w-full max-w-4xl flex-col justify-around gap-5 rounded-2xl bg-white p-6">
          <div>
            <div className="Fm:flex Fm:flex-col Fm:justify-around Fm:items-stretch Fm:gap-6 Fm:h-full">
              <div>
                <label
                  htmlFor="bill"
                  className="text-xl text-Fm-Dark-grayish-cyan"
                >
                  Bill
                </label>
                <input
                  type="number"
                  step={"0.01"}
                  id="bill"
                  placeholder="0"
                  {...register("bill", { required: true })}
                  className="Fm:mt-4 w-full rounded-lg border-[1px] bg-Fm-Very-light-grayish-cyan p-2 text-right text-2xl font-bold text-Fm-Very-dark-cyan hover:cursor-pointer"
                  style={{
                    backgroundImage: "url(images/icon-dollar.svg)",
                    backgroundPosition: "5% center",
                    backgroundRepeat: "no-repeat",
                    paddingLeft: "50px",
                  }}
                />
              </div>
              <div className="mt-12">
                <label
                  htmlFor="tip"
                  className="text-xl text-Fm-Dark-grayish-cyan"
                >
                  Select Tip %
                </label>
                <div className="Fm:grid-cols-3 Fm:mt-4 grid grid-cols-2 gap-3">
                  <input type="hidden" id="tip" {...register("tip")} />
                  {[0.05, 0.1, 0.15, 0.25, 0.5].map((tip) => {
                    const isStyleSelected = `hover:text-Fm-Very-dark-cyan hover:bg-Fm-Strong-cyan rounded-lg p-2 text-xl font-bold hover:cursor-pointer ${
                      currentValues.tip === tip
                        ? "text-Fm-Very-dark-cyan bg-Fm-Strong-cyan"
                        : "bg-Fm-Very-dark-cyan text-white"
                    }`;
                    return (
                      <button
                        key={tip}
                        type="button"
                        value={tip}
                        className={isStyleSelected}
                        onClick={(e) => {
                          handleTipSelection(Number(e.currentTarget.value));
                        }}
                      >
                        {tip * 100}%
                      </button>
                    );
                  })}
                  {isCustomActive ? (
                    <input
                      type="number"
                      value={customTip}
                      className=""
                      onChange={(e) => {
                        setcustomTip(e.target.value);
                        const customTip = parseInt(e.target.value);
                        setValue("tip", customTip / 100);
                      }}
                    />
                  ) : (
                    <button
                      className="rounded-lg bg-Fm-Very-light-grayish-cyan text-xl font-bold text-Fm-Dark-grayish-cyan hover:bg-Fm-Strong-cyan hover:text-Fm-Very-dark-cyan"
                      onClick={() => setIsCustomActive(true)}
                    >
                      Custom
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-12">
                <div className="flex items-baseline">
                  <label
                    htmlFor="people"
                    className="text-xl text-Fm-Dark-grayish-cyan"
                  >
                    Number of people
                  </label>
                  {Number(currentValues.people) === 0 && (
                    <span className="ml-auto text-red-500">
                      Can&apos;t be zero
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  id="people"
                  {...register("people", {
                    required: true,
                    min: 1,
                  })}
                  placeholder="0"
                  className="Fm:mt-4 w-full rounded-lg border-[1px] bg-Fm-Very-light-grayish-cyan p-2 text-right text-2xl font-bold text-Fm-Very-dark-cyan"
                  style={{
                    backgroundImage: "url(images/icon-person.svg)",
                    backgroundPosition: "5% center",
                    backgroundRepeat: "no-repeat",
                    paddingLeft: "50px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="Fm:flex Fm:flex-col Fm:justify-around Fm:items-stretch Fm:p-8 rounded-lg bg-Fm-Very-dark-cyan p-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-xl font-bold text-Fm-Very-light-grayish-cyan">
                  Tip Amount
                </p>
                <p className="text-xl text-Fm-Dark-grayish-cyan">/ person</p>
              </div>
              <p className="Fm:text-6xl text-4xl font-bold text-Fm-Strong-cyan">
                ${isFinite(Number(totalTip)) ? totalTip : "0.00"}
              </p>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-xl font-bold text-Fm-Very-light-grayish-cyan">
                  Total
                </p>
                <p className="text-xl text-Fm-Dark-grayish-cyan">/ person</p>
              </div>
              <p className="Fm:text-6xl text-4xl font-bold text-Fm-Strong-cyan">
                $
                {isFinite(Number(totalBillPerPerson))
                  ? totalBillPerPerson
                  : "0.00"}
              </p>
            </div>
            <button
              type="reset"
              onClick={() => reset()}
              className="w-full rounded-lg bg-Fm-Strong-cyan p-4 text-xl font-bold text-Fm-Very-dark-cyan hover:bg-[#9FE8DF]"
            >
              RESET
            </button>
          </div>
        </form>
      </article>
    </>
  );
}
