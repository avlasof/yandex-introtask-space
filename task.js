/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.position = position;
    this.capacity = capacity;
    this.occupiedSpace = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    console.log('Корабль "' + this.name + '". Местоположение: ' + this.position + 
        '. Занято: ' + this.occupiedSpace + ' из ' + this.capacity + 'т.');
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.occupiedSpace;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.occupiedSpace;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    if (newPosition.name) {
        this.position = newPosition.position;
    } else {
        this.position = newPosition;
    }
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Planet} planet Текущая планета.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Vessel.prototype.loadCargoTo = function (planet, cargoWeight) {
    if (this.getFreeSpace() >= cargoWeight) {
        if (cargoWeight >= 0) {
            this.occupiedSpace += cargoWeight;
            planet.availableAmountOfCargo -= cargoWeight;
        } else {
            console.error('Загрузка на корабль невозможна, вес груза(' + cargoWeight + 
                '), не должен быть отрицательным');
        }
    } else {
        console.error('Загрузка на корабль невозможна, вес груза(' + cargoWeight + 
            '), превышает свободное место(' + this.getFreeSpace() + ') на корабле');
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Planet} planet Текущая планета.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Vessel.prototype.unloadCargoFrom = function (planet, cargoWeight) {
    if (this.getOccupiedSpace() >= cargoWeight) {
        if (cargoWeight >= 0) {
            this.occupiedSpace -= cargoWeight;
            planet.availableAmountOfCargo += cargoWeight;
        } else {
            console.error('Разгрузка корабля невозможна, вес груза(' + cargoWeight + 
                '), не должен быть отрицательным');
        }
    } else {
        console.error('Разгрузка корабля невозможна, вес груза(' + cargoWeight + 
            '), превышает количество груза(' + this.getOccupiedSpace() + ') на корабле');
    }
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    console.log('Планета "' + this.name + '". Местоположение: ' + this.position + 
        '. Доступно груза: ' + this.availableAmountOfCargo + 'т.');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if (vessel.position[0] === this.position[0] && 
        vessel.position[1] === this.position[1]) {

        vessel.loadCargoTo(this, cargoWeight);
    } else {
        console.error("Загрузка невозможна, корабля нет на планете");
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if (vessel.position[0] === this.position[0] && 
        vessel.position[1] === this.position[1]) {
        
        vessel.unloadCargoFrom(this, cargoWeight);
    } else {
        console.error("Разгрузка невозможна, корабля нет на планете");
    }
}