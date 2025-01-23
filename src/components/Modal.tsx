const Modal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-slate-800 p-6 rounded-md w-72 md:w-96">
        <h3 className="text-xl font-semibold mb-4">Important Note</h3>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            As the application requires access to the Google Calendar data
            associated to an account, the OAuth Client needs to be verified by
            the Google Cloud QA Team. This can take a considerable amount of
            time (some days, or even months, in some cases).
            <br />
            So this application can only be accessed if the email address
            associated to your google account is listed among the{" "}
            <em>Testers</em>.
          </p>

          <p>
            To access the application, kindly send a mail to{" "}
            <a
              href="mailto:krishnanand2517@gmail.com"
              target="_blank"
              className="underline"
            >
              krishnanand2517@gmail.com
            </a>{" "}
            so that I can add you to the testers list.
          </p>

          <p>
            Or else, you can use the Demo Account:
            <br />
            <b>Email:</b> demo.user.projects@gmail.com
            <br />
            <b>Password:</b> demoaccount
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
