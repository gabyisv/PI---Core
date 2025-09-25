const int PINO_SENSOR_MQ2 = A0; //Declarando a Porta em que o Analogico do Arduino será conectado;

const int VALOR_MINIMO = 250;  
const int VALOR_MAXIMO = 1000; //Calibrando os valores captados pelo sensor;

void setup() { 
  Serial.begin(9600); //Sincronizando o IDE com a placa;
}

void loop() {
  int valorSensor = analogRead(PINO_SENSOR_MQ2); //Declarando Valor adquirido pelo sensor;

  float porcentagem = ((float)(valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100; //Convertendo em porcentagem
  
  if (porcentagem <0) {
   porcentagem = 0;
  } else if (porcentagem > 100) {
    porcentagem = 100; //Limitando a porcentagem;
  }

  Serial.print("Valor de Saídaí do Sensor: ");
  Serial.print(valorSensor);
  Serial.print(" -> Porcentagem: ");
  Serial.print(porcentagem);
  Serial.println("%"); //Declarando forma de exibir os valores;
  
  delay(1000);
}
