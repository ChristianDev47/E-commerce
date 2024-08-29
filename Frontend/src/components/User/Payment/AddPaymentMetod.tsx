import { useEffect, useState } from "react";
import plus from "../../../assets/plus.svg";
import FormPayment from "./ModalCreateCard";
import { getPaymentCards } from "../../../services/payment";
import { CardPaymentType } from "../../../types/paymentCard";
import { detectCardType } from "../../../services/creditCrds";

export default function AddPaymentMethod() {
  const [showCreatePayment, setShowCreatePaymemt] = useState<boolean>(false);
  const [creditCards, setCreditCards] = useState<CardPaymentType[]>();
  const [selectedCard, setSelectedCard] = useState<CardPaymentType>();

  useEffect(() => {
    const getData = async () => {
      const data = await getPaymentCards();
      setCreditCards(data);
      if (selectedCard) {
        setSelectedCard(
          data?.find((card: CardPaymentType) => card.id === selectedCard.id)
        );
      }
    };
    getData();
  }, [showCreatePayment]);

  useEffect(() => {
    if (showCreatePayment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCreatePayment]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className=" max-w-[1700px]  title">
        <div className={` ${showCreatePayment === true ? "block" : "hidden"}`}>
          <FormPayment
            setShowCreatePaymemt={setShowCreatePaymemt}
            selectedCard={selectedCard}
          />
        </div>
        <div className="flex flex-col items-start justify-start w-[1000px] lg:w-[700px] md:w-full sm:w-full px-[2rem] my-24">
          <div className="w-full">
            <p className="text-black text-[30px] text-start mb-2 title">
              Billetera
            </p>
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-2 lg:col-span-7 md:col-span-7 sm:col-span-7">
                <p className="text-[18px]">Agrega una tarjeta</p>
                <button
                  onClick={() => setSelectedCard(undefined)}
                  className="flex items-center justify-start border-l-8 rounded-md border-[#F26522] w-full p-4 my-2 space-x-2 bg-white shadow-md"
                >
                  <div className="flex items-center justify-center w-[90px] outline-dashed outline-gray-300 p-3">
                    <img
                      className="p-1 border-2 border-gray-400 rounded-full"
                      src={plus}
                      alt=""
                      width={25}
                    />
                  </div>
                  <p className="text-[13px] text-start">
                    Añade un nuevo metodo de pago
                  </p>
                </button>
                <p className="text-[18px] mb-2">Tus tarjetas</p>
                {creditCards &&
                  creditCards.map((card) => {
                    return (
                      <div
                        onClick={() => setSelectedCard(card)}
                        key={card.id}
                        className="flex items-center justify-start w-full p-4 space-x-2 bg-white border-gray-300 cursor-pointer border-y-2 "
                      >
                        <img
                          className="shadow-lg"
                          src={`/images/payment/${detectCardType(
                            card?.card_number
                          )}.jpg`}
                          alt=""
                          width={90}
                          height={40}
                        />
                        <div className="text-[13px]">
                          <p className="title">
                            Tarjeta de {detectCardType(card.card_number)}
                          </p>
                          <p>{card.card_number}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex items-center justify-start col-span-5 p-6 space-x-4 space-y-3 border border-gray-100 rounded-md shadow-xl bg-gray-50 lg:col-span-7 md:col-span-7 sm:col-span-7">
                {!selectedCard ? (
                  <div className="flex flex-col items-center justify-center w-full space-y-2">
                    <p className="text-center text-[14px]">
                      Agrega una tarjeta de credito o selecciona una para
                      actualizar sus datos
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCard(undefined);
                        setShowCreatePaymemt(true);
                      }}
                      className="p-2 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md text-[12px] "
                    >
                      Agrega una nueva tarjeta
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-[180px] sm:h-auto flex space-x-6">
                    <img
                      className="w-[260px] sm:w-[100px] sm:h-[80px] h-full shadow-lg"
                      src={`/images/payment/${detectCardType(
                        selectedCard?.card_number
                      )}.jpg`}
                      alt=""
                    />
                    <div className="flex flex-col items-start justify-between h-full">
                      <div className="text-[13px]">
                        <p className="title text-[21px]">
                          Tarjeta de{" "}
                          {detectCardType(selectedCard?.card_number ?? "")}
                        </p>
                        <div className="text-[14px]">
                          <p>Numero: {selectedCard?.card_number}</p>
                          <p>CVC/CVV: {selectedCard?.cvc}</p>
                        </div>
                      </div>
                      <div className="my-2 space-x-1">
                        <button
                          onClick={() => {
                            setSelectedCard(selectedCard);
                            setShowCreatePaymemt(true);
                          }}
                          className="px-3 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md text-[12px] py-1"
                        >
                          Editar
                        </button>
                        <button className="px-3 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md text-[12px] py-1">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
