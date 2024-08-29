import { useEffect, useState } from "react";
import plus from "../../assets/plus.svg";
import FormPayment from "../User/Payment/ModalCreateCard";
import { getPaymentCards } from "../../services/payment";
import { CardPaymentType } from "../../types/paymentCard";
import { detectCardType } from "../../services/creditCrds";

interface Props {
  selectedCard: CardPaymentType | undefined;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<CardPaymentType | undefined>
  >;
}

export default function SelectPayment({
  selectedCard,
  setSelectedCard,
}: Props) {
  const [showCreatePaymemt, setShowCreatePaymemt] = useState<boolean>(false);
  const [creditCards, setCreditCards] = useState<CardPaymentType[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await getPaymentCards();
      setCreditCards(data);
      if (showCreatePaymemt) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    };
    getData();
  }, [showCreatePaymemt]);

  return (
    <>
      <div className={`${showCreatePaymemt === true ? "block" : "hidden"}`}>
        <FormPayment setShowCreatePaymemt={setShowCreatePaymemt} />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <h3 className="title text-[16px] font-semibold">2 Método de pago</h3>
        <div className="w-full">
          <h3 className="title text-[13px] border-b-2 border-gray-200 py-1">
            Tus tarjetas de credito y debito
          </h3>
          <div>
            <div
              onClick={() => setShowCreatePaymemt(true)}
              className="flex items-center my-2 space-x-2 cursor-pointer"
            >
              <img src={plus} alt="" width={20} />
              <img
                className="shadow-md"
                src="/images/payment/Visa.jpg"
                alt=""
                width={80}
              />
              <p className="text-[13px] font-semibold">
                Agregar una tarjeta de credito o debido
              </p>
            </div>
          </div>
          {creditCards &&
            [...creditCards].reverse().map((card) => {
              return (
                <div
                  onClick={() => setSelectedCard(card)}
                  key={card.id}
                  className="cursor-pointer "
                >
                  <div className="flex items-center my-2 space-x-2 ">
                    <div className="flex items-start justify-start p-1 m-1 rounded-full">
                      <div
                        className={`${
                          selectedCard?.id === card.id
                            ? "bg-blue-500"
                            : "bg-transparent"
                        } rounded-full w-[8px] h-[8px] border outline outline-blue-500`}
                      ></div>
                    </div>
                    <img
                      className="shadow-md"
                      src={`/images/payment/${detectCardType(
                        card.card_number
                      )}.jpg`}
                      alt=""
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-[13px] font-semibold">
                        Tarjeta {detectCardType(card.card_number)}
                      </p>
                      <p className="text-[13px] font-semibold">
                        {card.card_number}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
