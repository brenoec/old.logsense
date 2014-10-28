var validate = function(location) {

  var isSpecial = false;
  var isApplication = false;
  var isSubsystem = false;

  try {

    // validate mandatory fields
    if (!location.system) {
      throw ('location.system is ' + location.system);
    }

    if (!location.solution) {
      throw ('location.solution is ' + location.solution);
    }

    // validate data type
    if (location.special) {
      if (location.special[0]) {
        if (!location.special[0].description && !location.special[0].type) {
          throw ('A special location must have a description and a type.');
        }

        isSpecial = true;
      }
    }

    if (location.application) {
      if (location.application[0]) {
        if (!location.application[0].name && !location.application[0].module &&
            !location.application[0].element && !location.application[0].routine) {
          throw ('An application must have a name, a domain, an element and a routine.');
        }

        isApplication = true;
      }
    }

    if (location.subsystem) {
      if (location.subsystem[0]) {
        if (!location.subsystem[0].name && !location.subsystem[0].type) {
          throw ('A subsystem must have a name and a type.');
        }

        isSubsystem = true;
      }
    }

    if (!isApplication && !isSubsystem && !isSpecial) {
      throw ('A location must be part of an application, be part a subsystem or be a special location.');
    }

    if (!(isApplication ^ isSubsystem ^ isSpecial)) {
      throw ('A location cannot be part of an application, be part a subsystem, or be a special location at the same time.');
    }

  } catch (err) {
    throw err;
  }

  return true;
}

module.exports.validate = validate;
