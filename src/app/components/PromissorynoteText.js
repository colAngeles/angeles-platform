import React from "react";
import {Text, StyleSheet, View, Image} from '@react-pdf/renderer';

export default function PromissorynoteText({ data, signURL }) {
const dateObj = new Date(data.createdAt);
  const date = dateObj.getDate();
  const monthNum = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const month = monthNum == 0 ? 'Enero' : monthNum == 1 ? 'Febrero' : monthNum == 2 ? 'Marzo': monthNum == 3 ? 'Abril': monthNum == 4 ? 'Mayo': monthNum == 5 ? 'Junio': monthNum == 6 ? 'Julio': monthNum == 7 ? 'Agosto': monthNum == 8 ? 'Septiembre': monthNum == 9 ? 'Octubre': monthNum == 10 ? 'Noviembre': monthNum == 11 ? 'Diciembre': ''

  const styles = StyleSheet.create({
    text: {
      margin: 11,
      fontSize: 11,
      textAlign: 'justify',
      fontFamily: 'Helvetica'
    },
    bold: {
      display: 'inline',
      fontFamily: 'Helvetica-Bold',
      margin: 11,
      fontSize: 10,
      textAlign: 'justify',
    },
    signContainer: {
      width: '100%',
      paddingHorizontal: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    view: {
      marginTop: 10,
      paddingHorizontal: 10,
      borderBottom: '1px solid #000',
      display: 'flex',
      height: '70px'
    },
    textSign: {
      fontSize: 8,
      textAlign: 'left',
      fontFamily: 'Helvetica'
    },
    boldSign: {
      display: 'inline',
      fontFamily: 'Helvetica-Bold',
      fontSize: 8,
      textAlign: 'left',
    },
    block: {
      display: 'flex'
    },
    sign: {
        height: '95%',
        objectFit: 'scale-down'
    }
  });
  return (
    <> 
      <View styles={styles.mainContainer}>
        <Text style={styles.text}>PAGARE No {data.number}</Text>
        <Text style={styles.text}>
          Nosotros, en virtud de este pagare, prometemos pagar solidaria e incondicionalmente el (dia/mes/año) _______________________ a la orden del <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> identificado con el NIT 901.349.673-4, su cesionario o a su orden a quien represente sus derechos u ostente en el futuro la calidad de <Text style={styles.bold}>ACREEDOR</Text>, en sus oficinas ubicadas en calle 73ª # 2 – 02 Este, barrio Altos de la Arboleda de la ciudad de Tunja, la suma de _______________________________ ($____________________), moneda legal por concepto de obligaciones derivadas de la prestación de servicios educativos al (la) ESTUDIANTE _____________________________________, más la suma de _____________________________ ($____________________________) que a la fecha adeudamos por concepto de intereses. Por lo tanto, hago constar:
          {"\n"}
          {"\n"}
          1. En caso de mora me obligo a pagar intereses a la tasa máxima legal, de acuerdo con las disposiciones legales vigentes. Los intereses de mora se causarán desde la exigibilidad de la cuota vencida hasta la fecha en que se verifique el pago. El hecho de que el tenedor legítimo de este Pagaré reciba pagos o abonos parciales no implica condonación de la mora, ni extinción del plazo, ni que renuncie a cobrar la totalidad de lo adeudado. 2. Que expresamente declaro excusada la presentación para el pago, el aviso de rechazo y el protesto. 3. Que en caso de cobro judicial o extrajudicial de este Pagaré serán de mi cuenta los gastos y costas que se ocasionen por la cobranza, por tanto en el evento de un cobro judicial, los gastos no se limitarán a las costas judiciales que decrete el Juez, sino también serán de mi cargo, el valor del impuesto de timbre, todos los honorarios de abogado de acuerdo a la autorización que he impartido al <Text style={styles.bold}>ACREEDOR</Text>, así como las comisiones por concepto de seguros y otros conceptos que se causen hasta el momento de pago. 4. Que reconozco de antemano el derecho que le asiste al <Text style={styles.bold}>ACREEDOR</Text>, para que en los eventos que a continuación se detallan, pueda declarar extinguido el plazo y de esta manera exigir anticipadamente, extrajudicial o judicialmente, sin necesidad de requerimiento alguno el pago de la totalidad del saldo insoluto de la obligación incorporada en el presente Pagaré, así como sus intereses, seguros, gastos de cobranzas, incluyendo los honorarios de abogado que hayan sido pactados por el <Text style={styles.bold}>ACREEDOR</Text> y las demás obligaciones a mi cargo constituidas a favor del <Text style={styles.bold}>ACREEDOR</Text>: a) Si se presenta mora en el cumplimiento de cualquiera de las obligaciones que tenga con el <Text style={styles.bold}>ACREEDOR</Text>. En este caso el <Text style={styles.bold}>ACREEDOR</Text> podrá restituirme el plazo, para lo cual podrá exigir el pago de las cuotas vencidas, junto con la totalidad de intereses causados hasta la fecha en la que se haga el respectivo pago, así como los gastos de honorarios de abogado y comisiones por concepto de seguros u otros conceptos que por mi cuenta hayan sido pagados por el <Text style={styles.bold}>ACREEDOR</Text>; b) Si giro cheques sin provisión de fondos; c) Si abro o se me inicia proceso de concurso de <Text style={styles.bold}>ACREEDORES</Text>, concordato, liquidación, oferta de cesión de bienes, cierre o abandono de los negocios o en el evento en que me encuentre en notorio estado de insolvencia. d) Si giro cheques sin provisión de fondos; e) Si muero, f) En los demás casos de ley. 5. Este Pagaré podrá ser llenado por el <Text style={styles.bold}>ACREEDOR</Text>, según las instrucciones impartidas por mí en la Carta de Instrucciones que se encuentra adjunta con este Pagaré, de conformidad con lo dispuesto en el artículo 622, inciso 2 del Código de Comercio. 6. Que expresamente autorizo al <Text style={styles.bold}>ACREEDOR</Text> para que a cualquier título endose el presente Pagaré o ceda el crédito incorporado en el mismo a favor de cualquier tercero sin necesidad de su notificación.
          {"\n"}
          {"\n"}
          Para constancia firmo en la ciudad de ____________________ a los (__) días del mes de ___________de (_______).
        </Text>
        {
          signURL ? (
            <View style={styles.signContainer} wrap={false}>
                <View style={styles.view}>
                  <Image src={signURL} style={styles.sign}/>
                </View>
                <Text style={styles.textSign}>FIRMA DEUDOR</Text>
                <Text style={styles.textSign}>Nombre: {data.person.name} {data.person.surname}</Text>
                <Text style={styles.textSign}>C.C {data.person.identification.id}</Text>
                <Text style={styles.textSign}>DIRECCIÓN: {data.person.location.address}</Text>
                <Text style={styles.textSign}>TELÉFONO: {data.person.phone}</Text>
            </View>
          ) : null
        }
      </View>
      <View break>
        <Text style={styles.text}>CARTA DE INSTRUCCIONES PAGARE No {data.number}</Text>
        <Text style={styles.text}>
          Señores {"\n"}
          <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> {"\n"}
          Ciudad. {"\n"}
        </Text>
        <Text style={styles.text}>
          El (los) abajo firmante(s), obrando en la calidad indicada al pie de mi (nuestras) firma(s), quien en adelante me(nos) denominaré(mos) <Text style={styles.bold}>EL DEUDOR</Text>, me permito manifestar que autorizo en forma irrevocable al <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> quien en adelante se denominará <Text style={styles.bold}>COLEGIO LOS ANGELES</Text>, o a su cesionario o a quien en el futuro represente sus derechos u ostente la calidad de <Text style={styles.bold}>ACREEDOR</Text> de los dineros que llegue a adeudar al <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> en virtud de las obligaciones derivadas de la prestación de servicios educativos al (la) ESTUDIANTE
          <Text style={styles.bold}> {data.student.name} {data.student.surname}</Text>, para llenar sin previo aviso el pagaré a la orden con espacios en blanco que he suscrito a favor del COLEGIO LOS ANGELES, conforme a las siguientes instrucciones:
          1. <Text style={styles.bold}>El COLEGIO LOS ANGELES</Text> para llenar el pagaré no requiere dar aviso a los firmantes del mismo. 2. El Pagaré podrá ser diligenciado por el <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> a partir de cualquiera de los siguientes eventos: a) Si se presenta mora en el cumplimiento de cualquiera de las obligaciones que tenga con el <Text style={styles.bold}>ACREEDOR</Text>. En este caso EL <Text style={styles.bold}>ACREEDOR</Text> podrá restituirme el plazo, para lo cual podrá exigir el pago de las cuotas vencidas, junto con la totalidad de intereses causados hasta la fecha en la que se haga el respectivo pago, así como los gastos de honorarios de abogado y comisiones por concepto de seguros u otros conceptos que por mi cuenta hayan sido pagados por el <Text style={styles.bold}>ACREEDOR</Text>; b) Si giro cheques sin provisión de fondos; c) Si abro o se me inicia proceso de concurso de <Text style={styles.bold}>ACREEDORES</Text>, concordato, liquidación, oferta de cesión de bienes, cierre o abandono de los negocios o en el evento en que me encuentre en notorio estado de insolvencia. d) Si giro cheques sin provisión de fondos; e) Si muero, f) En los demás casos de ley. 3. El valor del Pagaré será igual al monto de las sumas que le adeude al <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> por concepto obligaciones derivadas de la prestación de servicios educativos, suma que incluye intereses corrientes, moratorios, cuotas de manejo, comisiones, seguros, gastos, honorarios, costas judiciales o cualquier otro concepto que tenga el deber de pagar al <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> y que se hayan causado hasta el momento del diligenciamiento del pagaré que por medio de esta carta se instruye. 4. El lugar de pago del Pagaré será la ciudad donde se efectúe el cobro. e) La fecha de pago del crédito será la misma en que sea llenado el Pagaré por el <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> y serán exigibles inmediatamente todas las obligaciones en él contenidas a mi cargo, sin necesidad de que se me requiera judicial o extrajudicialmente en tal sentido. Además, por el hecho de ser utilizado el Pagaré, el <Text style={styles.bold}>COLEGIO LOS ANGELES</Text> podrá declarar de plazo vencido todas y cada una de las obligaciones que adicionalmente tenga a mi cargo, aun cuando respecto de ellas se hubiera pactado algún plazo para su exigibilidad y el mismo estuviere pendiente. Que el Pagaré así llenado presta mérito ejecutivo, pudiendo el <Text style={styles.bold}>ACREEDOR</Text> exigir su cancelación por vía judicial, sin perjuicio de las demás acciones legales que el <Text style={styles.bold}>ACREEDOR</Text> pueda tener. Las presentes instrucciones las imparto de conformidad con lo dispuesto en el artículo 622, inciso 2 del Código de Comercio para todos los efectos allí previstos. Dejo constancia que recibí copia de la presente Carta de Instrucciones, el cual declaro conocer y aceptar en su integridad y que hace parte de este documento.
          {"\n"}
          {"\n"}
          Para constancia firmo en la ciudad de Tunja a los ({date}) días del mes de {month} de ({year}).
        </Text>
        {
          signURL ? (
            <View style={styles.signContainer} wrap={false}>
                <View style={styles.view}>
                  <Image src={signURL} style={styles.sign}/>
                </View>
                <Text style={styles.textSign}>FIRMA DEUDOR</Text>
                <Text style={styles.textSign}>Nombre: {data.person.name} {data.person.surname}</Text>
                <Text style={styles.textSign}>C.C {data.person.identification.id}</Text>
                <Text style={styles.textSign}>DIRECCIÓN: {data.person.location.address}</Text>
                <Text style={styles.textSign}>TELÉFONO: {data.person.phone}</Text>
            </View>
          ) : null
        }
      </View>
      
      </>
        );
}