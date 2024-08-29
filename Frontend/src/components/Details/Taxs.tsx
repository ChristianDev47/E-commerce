import close from "../../assets/close.svg";

interface Props {
  price: number;
  setShowDetail: (value: boolean) => void;
}

export default function DetailFax({ price, setShowDetail }: Props) {
  const total = parseFloat(price.toString()) + 85.05 + ((parseFloat(price.toString()) + 85.05) * 0.13);

  return (
    <div className="relative bg-white border-2 border-gray-300 rounded-md w-[320px] p-3 space-y-3">
      <div
        onClick={() => setShowDetail(false)}
        className="absolute cursor-pointer top-7 right-2"
      >
        <img className=" w-[20px]" src={close} alt="" />
      </div>
      <p className="text-[17px] font-bold">Detalles de envio y tarifas</p>
      <div className="flex flex-col items-start py-2 border-t border-b-2 border-gray-300">
        <div className="flex items-start justify-between w-full">
          <p>Precio</p>
          <p>${price}</p>
        </div>
        <div className="flex items-start justify-between w-full">
          <p>Envio</p>
          <p>$85.05</p>
        </div>
        <div className="flex items-start justify-between w-full space-x-4">
          <p>Depósito estimado de tarifas de importación</p>
          <p>${((parseFloat(price.toString()) + 85.05) * 0.13).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-start justify-between w-full">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
