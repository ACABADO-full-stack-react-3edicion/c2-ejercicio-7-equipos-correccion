const equiposMayoresEdad = (equipos, edad) =>
  equipos.filter(
    ({
      asignado: {
        empleado: { edad: edadEmpleado },
      },
    }) => edadEmpleado > edad
  );

const equiposProvincia = (equipos, provincia) =>
  equipos.filter(
    ({ asignado: { provincia: provinciaEmpleado } }) =>
      provinciaEmpleado.toLowerCase() === provincia.toLowerCase()
  );

const provincias = (equipos) =>
  equipos
    .map(({ asignado: { provincia } }) => provincia)
    .filter((provincia, i, provincias) => provincias.indexOf(provincia) === i);

const puestos = (equipos) =>
  equipos
    .map(
      ({
        asignado: {
          empleado: { puesto },
        },
      }) => puesto
    )
    .filter((puesto, i, puestos) => puestos.indexOf(puesto) === i);

const edadMedia = (equipos) =>
  equipos.reduce(
    (
      acumulador,
      {
        asignado: {
          empleado: { edad },
        },
      }
    ) => acumulador + edad / equipos.length,
    0
  );

const equiposPorEdad = (equipos) => {
  const equiposOrdenados = [...equipos];
  return equiposOrdenados.sort(
    (
      {
        asignado: {
          empleado: { edad: edadA },
        },
      },
      {
        asignado: {
          empleado: { edad: edadB },
        },
      }
    ) => edadA - edadB
    /* if (edadA > edadB) {
        return 1;
      } else if (edadA < edadB) {
        return -1;
      } else {
        return 0;
      } */
  );
};

const equiposTipo = (equipos, tipoEquipo) =>
  equipos.filter(({ tipo }) => tipo.toLowerCase() === tipoEquipo.toLowerCase());

const trabajadoresTipo = (equipos, tipoEquipo) =>
  equipos
    .filter(({ tipo }) => tipo.toLowerCase() === tipoEquipo.toLowerCase())
    .map(({ asignado: { empleado } }) => empleado);

const equiposPorTipo = (equipos) =>
  equipos.reduce((acumulador, equipo) => {
    const { tipo } = equipo;
    const subResultado = acumulador.find((equipo) => equipo.tipo === tipo);
    if (subResultado) {
      subResultado.equipos.push(equipo);
      return acumulador;
    } else {
      return [
        ...acumulador,
        {
          tipo,
          equipos: [equipo],
        },
      ];
    }
  }, []);

const equiposTipoLocalidad = (equipos, tipoEquipo, localidad) =>
  equipos.filter(
    ({ tipo, asignado: { poblacion } }) =>
      tipo.toLowerCase() === tipoEquipo.toLowerCase() &&
      localidad.toLowerCase() === poblacion.toLowerCase()
  );

const resumenEquipos = (equipos) =>
  equipos.map(({ id, asignado: { poblacion, provincia } }) => ({
    id,
    poblacion,
    provincia,
  }));
