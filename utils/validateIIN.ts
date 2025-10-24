/**
 * Валидация ИИН (Индивидуальный Идентификационный Номер Казахстана)
 *
 * ИИН - 12-значный цифровой код:
 * - Разряды 1-6: дата рождения в формате YYMMDD
 * - Разряд 7: век рождения и пол (1,2 - XIX век, 3,4 - XX век, 5,6 - XXI век; нечетное - мужской, четное - женский)
 * - Разряды 8-11: код органа Юстиции
 * - Разряд 12: контрольная цифра
 */

/**
 * Проверяет корректность даты рождения из ИИН
 */
function validateBirthDate(iin: string): boolean {
  if (iin.length !== 12) return false;

  const year = parseInt(iin.substring(0, 2), 10);
  const month = parseInt(iin.substring(2, 4), 10);
  const day = parseInt(iin.substring(4, 6), 10);

  // Проверка валидности месяца
  if (month < 1 || month > 12) return false;

  // Проверка валидности дня
  if (day < 1 || day > 31) return false;

  // Дополнительная проверка для месяцев с меньшим количеством дней
  if ([4, 6, 9, 11].includes(month) && day > 30) return false;

  // Проверка февраля (упрощенная, без учета високосных годов)
  if (month === 2 && day > 29) return false;

  return true;
}

/**
 * Проверяет 7-й разряд ИИН (век и пол)
 */
function validateCenturyGender(iin: string): boolean {
  const centuryGender = parseInt(iin[6], 10);
  // 7-й разряд должен быть от 1 до 6
  return centuryGender >= 1 && centuryGender <= 6;
}

/**
 * Вычисляет контрольную сумму ИИН
 */
function calculateChecksum(iin: string): number | null {
  // Шаг 1: Сумма произведений (i+1) * цифра[i]
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += (i + 1) * parseInt(iin[i], 10);
  }

  let checksum = sum % 11;

  // Если остаток = 10, переходим к шагу 2
  if (checksum === 10) {
    sum = 0;
    for (let i = 0; i < 11; i++) {
      let weight = (i + 3) % 11;
      if (weight === 0) {
        weight = 11;
      }
      sum += weight * parseInt(iin[i], 10);
    }
    checksum = sum % 11;

    // Если снова получили 10, ИИН невалиден
    if (checksum === 10) {
      return null;
    }
  }

  return checksum;
}

/**
 * Основная функция валидации ИИН
 */
export function validateIIN(iin: string): {
  isValid: boolean;
  error?: string;
} {
  // Проверка на пустое значение
  if (!iin || iin.trim() === "") {
    return { isValid: false, error: "ИИН не может быть пустым" };
  }

  // Убираем пробелы
  const cleanIIN = iin.trim();

  // Проверка длины
  if (cleanIIN.length !== 12) {
    return { isValid: false, error: "ИИН должен содержать 12 цифр" };
  }

  // Проверка, что все символы - цифры
  if (!/^\d{12}$/.test(cleanIIN)) {
    return { isValid: false, error: "ИИН должен содержать только цифры" };
  }

  // Вспомогательная проверка: дата рождения
  if (!validateBirthDate(cleanIIN)) {
    return { isValid: false, error: "Некорректная дата рождения в ИИН" };
  }

  // Вспомогательная проверка: 7-й разряд (век и пол)
  if (!validateCenturyGender(cleanIIN)) {
    return { isValid: false, error: "Некорректный разряд века/пола в ИИН" };
  }

  // Основная проверка: контрольная сумма
  const checksum = calculateChecksum(cleanIIN);

  if (checksum === null) {
    return { isValid: false, error: "Некорректная контрольная сумма ИИН" };
  }

  const controlDigit = parseInt(cleanIIN[11], 10);

  if (checksum !== controlDigit) {
    return {
      isValid: false,
      error: "Контрольная цифра ИИН не совпадает",
    };
  }

  return { isValid: true };
}

/**
 * Упрощенная функция для быстрой проверки
 */
export function isValidIIN(iin: string): boolean {
  return validateIIN(iin).isValid;
}
