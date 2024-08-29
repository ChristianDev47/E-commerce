import close from "../../../assets/profile/close.svg"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditCardSchema } from "../../../schemas/validations/paymentSchema";
import { CardPaymentType, PaymentCard } from "../../../types/paymentCard";
import { CreatePaymentCard, updatePaymentCard } from "../../../services/payment";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

interface Props {
  setShowCreatePaymemt: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCard?: CardPaymentType;
}

export default function FormPayment({setShowCreatePaymemt, selectedCard}: Props) {
  const {user} = useAuth()
  const date = new Date();
  const myYear = date.getFullYear();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PaymentCard>({
    resolver: zodResolver(creditCardSchema),
  });

  useEffect(() => {
    if(selectedCard){
      const [month, year] = selectedCard.due_date.split('/');
      reset({card_number: selectedCard.card_number, name: selectedCard.name, due_date: {year, month}, cvc: selectedCard.cvc})
    }
  }, [reset, selectedCard])
  const onSubmit = async (data: PaymentCard) => {
    try {
      const myData = !selectedCard ? {name: data.name, card_number: data.card_number, due_date: `${data.due_date.month}/${data.due_date.year}`, cvc: data.cvc, user: user.id} : {...data, due_date: `${data.due_date.month}/${data.due_date.year}`} 
      const myUser = !selectedCard ? await CreatePaymentCard({ paymentCard: myData }) : await updatePaymentCard({ id: selectedCard.id,  newData: {...myData} });
      if (myUser === undefined ) {
        toast.error(`Datos no ${!selectedCard ? 'agregados' : 'actualizados'}.`, {
          duration: 5000,
        });
      } else {
        toast.success(`Datos ${!selectedCard ? 'agregados' : 'actualizados'} correctamente. Cierre el formulario para mostrar los nuevos datos.`, {
          duration: 4000,
          style: {
            background: '#7DA640',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#000',
          },
        });
      }
    } catch (error) {
      console.error(`Error al ${!selectedCard ? 'agregar' : 'actualizar'} los datos:`, error);
      toast.error(`Error al ${!selectedCard ? 'agregar' : 'actualizar'} los datos. Por favor, inténtalo de nuevo más tarde.`, {
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#000000b6] title w-[100vw] h-[100vh] fixed top-0 left-0 m-auto  sm:px-4  z-50">
      <div className="flex flex-col items-start justify-start w-[750px] sm:w-full bg-white rounded-lg shadow-lg overflow-hidden">
       <div className="flex items-center justify-between w-full p-4 bg-[#2B2A29] text-white">
        <p className="font-semibold">{selectedCard ? 'Editar' : 'Agregar'} una tarjeta de credito o debito</p>
        <img className="cursor-pointer" onClick={() => setShowCreatePaymemt(false)} src={close} alt="" width={20} />
       </div>
       <div className="grid w-full grid-cols-7 gap-0">
        {
          Object.entries(errors).length > 0 &&
          <div className="col-span-7 p-4 m-4 border-2 border-red-600 rounded-md">
            <p className="text-red-600 title">Error con algunos campos</p>
            <ul>
              {errors.card_number?.message && <li className="text-[12px]">- {errors.card_number.message}</li>}
              {errors.name?.message && <li className="text-[12px]">- {errors.name.message}</li>}
              {errors.due_date?.root && <li className="text-[12px]">- {errors.due_date.root.message}</li>}
              {errors.cvc?.message && <li className="text-[12px]">- {errors.cvc.message}</li>}
            </ul>
          </div> 
        }
          <div className="col-span-4 border-r-2 sm:col-span-7">
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-5 gap-2 text-[13px] w-full ">
                <div className="flex flex-col items-end justify-start col-span-2 mt-1 space-y-5">
                  <label className="font-semibold" htmlFor="card_number">Número de tarjeta</label>
                  <label className="font-semibold" htmlFor="card_number">Nombre</label>
                  <label className="font-semibold" htmlFor="card_number">Fecha de expiración</label>
                  <label className="font-semibold" htmlFor="card_number">(CVV/CVC)</label>
                </div>
                <div className="col-span-3 space-y-2">
                  <div>
                    <input
                    className=" p-1 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 w-[180px]"
                    type="text"
                    id="card_number"
                    {...register('card_number')}
                    aria-invalid={errors.card_number ? "true" : "false"}
                    />
                  </div>
                  <div>
                    <input
                    className=" p-1 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 w-[180px]"
                    type="text"
                    id="name"
                    {...register('name')}
                    aria-invalid={errors.name ? "true" : "false"}
                    />
                  </div>
                  <div className="space-x-2">
                    <select id="due_date.month" {...register('due_date.month')} className="p-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-100">
                      {
                        Array.from({ length: 12 }, (_, index) => {
                          const valor = index + 1;
                          const texto = valor < 10 ? `0${valor}` : valor.toString();
                          return (
                            <option value={texto} key={index}>
                              {texto}
                            </option>
                          );
                        })
                      }
                    </select>
                    <select id="due_date.year" {...register('due_date.year')}  className="p-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-100">
                    {
                        Array.from({ length: 20 }, (_, index) => {
                          const texto = myYear + index;
                          return (
                            <option value={texto} key={index}>
                              {texto}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <input
                    className=" p-1 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700 w-[80px]"
                    type="text"
                    id="cvc"
                    {...register('cvc')}
                    aria-invalid={errors.cvc ? "true" : "false"}
                    />
                  </div>
                </div>
                <p className="col-span-2"></p>
                <button className="col-span-3 p-1 text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md w-[120px]"  type="submit">{selectedCard ? 'Guardar Datos' : 'Agregar tarjeta'}</button>
              </div>
            </form>
          </div>
          <div className="col-span-3 p-4 text-[13px] sm:col-span-7">
            <p>Se aceptan todos estos tipos de tarjetas de debido y credito:</p>
            <div className="flex flex-wrap space-x-2 space-y-2">
              <img src='/images/payment/Visa.jpg' alt="" width={80} />
              <img src='/images/payment/MasterCard.jpg' alt="" width={80} />
              <img src='/images/payment/American Express.jpg' alt="" width={80} />
              <img src='/images/payment/Discover.jpg' alt="" width={80} />
            </div>
          </div>
       </div>
      </div>
    </div>
  );
}
