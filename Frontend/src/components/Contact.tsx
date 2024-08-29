import location from "../assets/location.svg";
import phone from "../assets/phone.svg";
import mail from "../assets/mail.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../schemas/validations/userSchema";
import { ContactType } from "../types/user";
import toast from "react-hot-toast";
// import { sendEmail } from "../services/email";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactType) => {
    console.log(data);
    toast.success(
      `Mensaje enviado. Nos pondremos en contacto lo mas pronto posible`,
      {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-full title ">
      <div className="max-w-[1700px] 2xl:px-[9rem] px-[2rem] flex flex-col items-center space-y-20 my-[6rem]">
        <div className="w-[50%] sm:w-[90%] md:w-[90%] flex flex-col items-center text-center justify-center">
          <h1 className="text-[23px] font-semibold">Contáctenos</h1>
          <div className="h-1.5 w-[10rem] bg-[#F26522] mb-2"></div>
          <p>
            ¿Tiene alguna pregunta? Nos encantaría saber de usted. Envíanos un
            mensaje y te responderemos lo antes posible.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1">
          <div className="w-full">
            <p className="text-[18px] font-semibold">
              Ponte en contacto con nosotros
            </p>
            <form
              className="w-full flex flex-col  my-4 form text-[14px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-center justify-start w-full space-y-6">
                <div className="relative w-full">
                  <input
                    className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                    type="text"
                    {...register("name")}
                    placeholder="Introduce tu nombre"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-[12px] absolute text-[#ff2d2d]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                    type="email"
                    {...register("email")}
                    placeholder="Introduce tu correo electrónico"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-[12px] absolute text-[#ff2d2d]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full">
                  <textarea
                    className="w-full p-2 text-gray-700 border-2 border-gray-200 rounded-md outline-none placeholder:text-gray-700"
                    {...register("message")}
                    placeholder="Introduce tu mensaje"
                    rows={9}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-[12px] absolute text-[#ff2d2d]">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button className="py-2 px-3 font-bold text-center text-white transition-all hover:bg-[#F26522] bg-[#2B2A29] rounded-md w-full">
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <img
            className="md:hidden sm:hidden"
            src="/images/account/contact.jpeg"
            alt=""
          />
        </div>
        <div className="flex flex-wrap items-start justify-between w-full">
          <div className="space-y-2 w-[340px] my-4">
            <h3 className="text-[20px] font-semibold">New York Office</h3>
            <div className="flex items-center justify-start space-x-4">
              <img src={location} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">
                  PO Box 16122 Collins Street West Victoria 8007 Canada
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={phone} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">(+48) 564-334-21-22-34</p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={mail} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">info@example.com</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 w-[340px] my-4">
            <h3 className="text-[20px] font-semibold">London Office</h3>
            <div className="flex items-center justify-start space-x-4">
              <img src={location} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">
                  PO Box 16122 Collins Street West Victoria 8007 Landon
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={phone} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">(+48) 564-334-21-22-34</p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={mail} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">info@example.com</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 w-[340px] my-4">
            <h3 className="text-[20px] font-semibold">Netherlands Office</h3>
            <div className="flex items-center justify-start space-x-4">
              <img src={location} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">
                  PO Box 16122 Collins Street West Victoria 8007 Netherlands
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={phone} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">(+48) 564-334-21-22-34</p>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <img src={mail} alt="" width={30} />
              <div className="space-y-1">
                <p className="text-[14px]">info@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
