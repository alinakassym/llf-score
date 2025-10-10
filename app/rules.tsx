// app/rules.tsx
import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function RulesScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <Text
        style={{
          padding: 16,
          fontSize: 24,
          fontWeight: "700",
          color: c.text,
          borderBottomWidth: 1,
          borderBottomColor: c.border,
        }}
      >
        Правила ЛЛФ
      </Text>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 14,
              color: c.textMuted,
              marginBottom: 16,
            }}
          >
            Опубликовано: 25 июля 2013 года{"\n"}
            Обновлено: 09 апреля 2015 года
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            1. Поле для игры и ворота
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Размеры.</Text> Поле для игры
            имеет форму прямоугольника. Боковая линия должна быть длиннее линии
            ворот. Длина: минимум 40,0 м, максимум 60,0м. Ширина: минимум 25,0м,
            максимум 35,0м.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Разметка.</Text> Разметка поля
            для игры производится с помощью линий. Эти линии входят в площадь,
            которую они ограничивают две длинные линии, ограничивающие поле для
            игры, называются боковыми, две короткие -линиями ворот. Ширина любой
            из линий не превышает 0,12 м. В центре поля наносится круглая
            отметка (точка). В каждом углу площадки отмечаются угловые сектора в
            виде квадрата размером в котором стороны равны 30см.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Штрафная площадь.</Text>{" "}
            Штрафная площадь обозначается в конце каждой из половин поля
            следующим образом: Из точек центра каждой из стоек ворот на
            расстоянии от 2 м до 4 м по лицевой линии под прямым углом к линии
            ворот, вглубь поля проводятся две линии. На расстоянии от 6 м до 8 м
            эти линии соединяются другой линией, параллельной линии ворот. Зона,
            ограничиваемая этими линиями и линией ворот, называется штрафной
            площадью. Напротив центра ворот на расстоянии 0,2 м от внешней линии
            штрафной площади делается круглая отметка (точка) – отметка
            пробивания пенальти.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Ворота.</Text> Ворота должны
            размещаться по центру каждой из линий ворот. Они состоят из двух
            вертикальных стоек, находящихся на равном расстоянии от углов поля и
            соединенных вверху горизонтальной перекладиной. Расстояние между
            стойками – 4.0 м, а расстояние от нижнего контура перекладины до
            поверхности земли - 2,0 м.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            2. Мяч
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Качество и параметры.</Text> Мяч
            имеет сферическую форму (N5), изготовлен из кожи или другого
            пригодного для этих целей материала, имеет длину окружности не более
            70 см и не менее 68 см, на момент начала матча весит не более 450
            гр. и не менее 410гр., имеет давление, равное 0,6-1,1 атмосферы
            (600-1100 гр./ кв.см) на уровне моря.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            3. Число игроков
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Игроки.</Text> Матч проводится с
            участием двух команд с числом игроков в каждой - не более шести,
            включая вратаря. Матч не может начинаться, если в состав любой из
            команд входит менее 5 (пяти) игроков.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Количество замен.</Text>{" "}
            Командам разрешается проводить неограниченное количество замен с
            правом замененного игрока вновь выйти на поле.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            4. Экипировка игроков
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Экипировка.</Text> Игроки
            команды должны быть экипированы в спортивную одежду и спортивную
            обувь.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Спортивный вид.</Text> Все
            игроки, находящиеся на футбольном поле, должны иметь идентичные
            футболки. Игроки могут меняться футболками только за пределами поля.
            Цвет формы каждого вратаря должен отличаться от остальных игроков и
            судьи.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            5. Судья
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Полномочия судьи.</Text> Каждый
            матч контролируется судьей, имеющим все полномочия по обеспечению
            соблюдения Правил игры в том матче, на который он назначен.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            6. Продолжительность игры
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Игровое время.</Text>{" "}
            Продолжительность игры - два равных тайма по 20 минут «грязного
            времени».
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Перерыв между таймами.</Text>{" "}
            Игроки имеют право на перерыв между двумя таймами. Перерыв между
            таймами не должен превышать 5 минут.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            7. Начало и возобновление игры
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Начальный удар.</Text> Начальный
            удар - это способ начала или возобновления игры: в начале матча;
            после забитого гола; в начале второго тайма; в начале каждого тайма
            добавочного времени, если таковое назначается.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            8. Мяч в игре и не в игре
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Мяч не в игре.</Text> Мяч
            считается вышедшим из игры, если он полностью пересек линию ворот
            или боковую линию - по земле или по воздуху; игра была остановлена
            судьей.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            9. Определение взятия ворот
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Гол.</Text> Мяч считается
            забитым в ворота, если он полностью пересек линию ворот между
            стойками и под перекладиной, при условии, что перед этим забившая
            гол команда не нарушила Правила игры.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            10. Положение "вне игры"
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Положение "вне игры" не фиксируется.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            11. Нарушения правил и недисциплинированное поведение
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Штрафной удар.</Text> Право
            выполнения штрафного удара предоставляется противоположной команде в
            случае совершения игроком нарушений: попытка ударить соперника
            ногой; подножка; прыжок на соперника; атака соперника; удар рукой;
            толчок соперника.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Пенальти.</Text> Пенальти
            назначается при любом из выше приведенных десяти нарушений, если оно
            совершено игроком в пределах штрафной площади своих ворот.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            12. Штрафной и свободный удары
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700" }}>Виды ударов.</Text> Удары могут
            быть штрафными или свободными. Как при штрафном, так и при свободном
            ударах мяч в момент выполнения удара должен лежать неподвижно.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            13. Пенальти
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Пенальти назначается в ворота команды, игроки которой совершили одно
            из десяти нарушений, наказуемых штрафным ударом, в пределах своей
            штрафной площади в то время, когда мяч находился в игре.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            14. Ввод мяча из-за боковой линии
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Ввод мяча является способом возобновления игры. Гол, забитый
            непосредственно после ввода, не засчитывается.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            15. Удар от ворот
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Удар от ворот является способом возобновления игры. Гол, забитый
            непосредственно с удара от ворот, не засчитывается.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            16. Угловой удар
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Угловой удар является способом возобновления игры. Гол, забитый
            непосредственного с углового удара, засчитывается, но только в
            случае, если он забит в ворота противоположной команды.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            17. Послематчевые пенальти
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Выполнение пенальти - это способ определения команды-победительницы
            в случаях, когда по регламенту соревнования требуется определить
            команду-победительницу после окончания матча с ничейным результатом.
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: c.text,
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            18. Модификация Правил
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: c.text,
              lineHeight: 22,
              marginBottom: 24,
            }}
          >
            При условии согласия участников соревнований и соблюдения принципов
            данных Правил, допускаются модификации в применении Правил: размер
            поля для игры; размер, вес и материал мяча; расстояние между
            стойками ворот; продолжительность таймов; замены.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
