import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import TableDataClient from "../components/TableDataClient";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import ServiceCard from "./ServiceCard";
import "../styles/TabSuperAdmin.css";
import "../styles/DashboardTables.css";
import TableDataService from "./TableDataService";
import TableDataSpecialist from "./TableDataSpecialist";
import TableDataAppointment from "./TableDataAppointment";

function TabSuperAdmin() {
  const { store, actions } = useContext(Context);

  const [activeTab, setActiveTab] = useState("0");

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  useEffect(() => {
    actions.getClients();
    actions.getAdmins();
  }, []);

  return (
    <div className="TabSuperAdmin">
      <Nav tabs id="tabs">
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("1")}
          >
            <i
              className="fa-solid fa-calendar-check p-1"
              style={{ color: "#8DC2FE" }}
            ></i>
            Citas
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("2")}
          >
            <i
              className="fa-solid fa-hospital-user p-1"
              style={{ color: "#8DC2FE" }}
            ></i>
            Pacientes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "3" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("3")}
          >
            <i
              className="fa-solid fa-user-doctor p-1"
              style={{ color: "#8DC2FE" }}
            ></i>
            Especialistas
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "4" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("4")}
          >
            <i
              className="fa-solid fa-bookmark p-1"
              style={{ color: "#8DC2FE" }}
            />
            Servicios
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* !!!!!!!!!!!!!!!!!! TABLA DE CITAS !!!!!!!!!!!!!!!!!!!!!!!*/}
        <TabPane tabId="1">
          <div className="container">
            <br />
            <table className="table table-borderer table-sm shadow">
              <thead>
                <tr style={{ backgroundColor: "#E8FFEB" }}>
                  <th scope="col" className="th p-2">
                    #Cita
                  </th>
                  <th scope="col" className="th p-2">
                    Especialista
                  </th>
                  <th scope="col" className="th p-2">
                    Paciente
                  </th>
                  <th scope="col" className="th p-2">
                    Cita
                  </th>
                  <th scope="col" className="th p-2">
                    Estado de cita
                  </th>
                  <th scope="col" className="th p-2">
                    Pago
                  </th>
                  <th scope="col" className="th p-2">
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                    <i className="fa-solid fa-trash-can"></i>{" "}
                  </th>
                </tr>
              </thead>
              {!!store.appointments &&
                store.appointments.length > 0 &&
                store.appointments.map((appointment, i) => (
                  <TableDataAppointment {...appointment} key={i} index={appointment.id} />
                ))}
            </table>
          </div>
        </TabPane>

        {/* !!!!!!!!!!!!!!!!!! TABLA DE CLIENTES !!!!!!!!!!!!!!!!!!!!!!!*/}
        <TabPane tabId="2">
          <div className="container">
            <br />
            <table className="table table-borderer table-sm shadow">
              <thead>
                <tr style={{ backgroundColor: "#6495ED" }}>
                  <th scope="col" className="th p-2">
                    ID
                  </th>
                  <th scope="col" className="th p-2">
                    Paciente
                  </th>
                  <th scope="col" className="th p-2">
                    Email
                  </th>
                  <th scope="col" className="th p-2">
                    Historial de citas
                  </th>
                  <th scope="col" className="th p-2">
                    Próximas citas
                  </th>
                  <th scope="col" className="th p-2">
                    Pago
                  </th>
                  <th scope="col" className="th p-2">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash-can"></i>
                  </th>
                </tr>
              </thead>
              {!!store.clients &&
                store.clients.length > 0 &&
                store.clients.map((client, i) => (
                  <TableDataClient {...client} key={i} index={client.id} />
                ))}
            </table>
          </div>
        </TabPane>

        {/* !!!!!!!!!!!!!!!!!! TABLA DE ESPECIALISTAS !!!!!!!!!!!!!!!!!!!!!!!*/}
        <TabPane tabId="3">
          <div className="container">
            <br />
            <table className="table table-borderer table-sm shadow">
              <thead>
                <tr style={{ backgroundColor: "#BCBBF8" }}>
                  <th scope="col" className="th p-2">
                    ID
                  </th>
                  <th scope="col" className="th p-2">
                    Especialista
                  </th>
                  <th scope="col" className="th p-2">
                    Especialidad
                  </th>
                  <th scope="col" className="th p-2">
                    Código título
                  </th>
                  <th scope="col" className="th p-2">
                    Datos generales
                  </th>
                  <th scope="col" className="th p-2">
                    Tarifa
                  </th>
                  <th scope="col" className="th p-2">
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                    <i className="fa-solid fa-trash-can"></i>
                  </th>
                </tr>
              </thead>
              {!!store.specialists &&
                store.specialists.length > 0 &&
                store.specialists.map((specialist, i) => (
                  <TableDataSpecialist {...specialist} key={i} index={specialist.id} />
                ))}
            </table>
          </div>
        </TabPane>
        {/* !!!!!!!!!!!!!!!!!! TABLA DE SERVICIOS !!!!!!!!!!!!!!!!!!!!!!!*/}
        <TabPane tabId="4">
          <div className="container">
            <br />
            <table className="table table-borderer table-sm shadow">
              <thead>
                <tr style={{ backgroundColor: "#939794", color: "white" }}>
                  <th scope="col" className="th p-2">
                    ID
                  </th>
                  <th scope="col" className="th p-2">
                    Servicio
                  </th>
                  <th scope="col" className="th p-2">
                    Información
                  </th>
                  <th scope="col" className="th p-2">
                    Tarifa
                  </th>
                  <th scope="col" className="th p-2">
                    Especialistas disponibles
                  </th>
                  <th scope="col" className="th p-2">
                    Disponibilidad
                  </th>
                  <th scope="col" className="th p-2">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash-can"></i>
                  </th>
                </tr>
              </thead>
              {!!store.services &&
                store.services.length > 0 &&
                store.services.map((service, i) => (
                  <TableDataService {...service} key={i} index={service.id} />
                ))}
            </table>
          </div>
        </TabPane>
        {/*fin tabla servicios*/}
      </TabContent>
    </div>
  );
}

export default TabSuperAdmin;
