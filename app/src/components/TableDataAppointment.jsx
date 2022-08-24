import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalEdit from "./Modal/ModalEdit";

const TableDataAppointment = ({
  index,
  dateTime,
  pacient_id,
  doctor_id,
  pacient,
  doctor,
  service,
  invoice,
}) => {
  const { store, actions } = useContext(Context);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    console.log(appointmentId);
  }, [appointmentId]);

  const handleDeleteAppoinment = async (e) => {
    // Fetching data from API
    const response = await fetch(
      `${store.apiURL}/api/delete_appoinment/${appointmentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.currentUser?.access_token}`,
        },
      }
    );

    const { status, message, data } = await response.json();

    actions.getAllAppointments();

    console.log(data);

    if (status === "failed") {
      toast.error(message);
    }

    if (status === "success") {
      actions.getAllAppointments();
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <tbody className="table-group-divider" style={{ fontSize: "13px" }}>
      <tr>
        <td scope="row" className="td p-2">
          #{index}
        </td>
        <td className="td p-2">{dateTime}</td>
        <td className="td p-2">{pacient_id}</td>
        <td className="td p-2">{pacient}</td>
        <td className="td p-2">{doctor_id}</td>
        <td className="td p-2">{doctor}</td>
        <td className="td p-2">{service}</td>
        <td className="td p-2">
          {Object.keys(invoice).map((key, i) => {
            return (
              <p key={i}>
                {key}: {invoice[key]}
              </p>
            );
          })}
        </td>
        <td className="td p-2">
          <div className="botones">
            <div className="d-flex align-items-center">
              <ModalEdit editWord="Reagendar" editWhat="cita" />
              <div className="delete-appointment-modal">
                <Button
                  color="light"
                  onClick={() => {
                    toggle();
                    setAppointmentId(index);
                  }}
                  index={index}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </Button>
                <Modal isOpen={modal} fade={false} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Eliminar servicio</ModalHeader>
                  <ModalBody>
                    Estas seguro de qué quieres Eliminar el servicio?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      // onClick={toggle}
                      onClick={(e) => {
                        toggle();
                        handleDeleteAppoinment(e);
                      }}
                    >
                      Confirmar
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableDataAppointment;
