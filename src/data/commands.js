export const commands = {
  'pgc-info': {
    title: 'PGC',
    desc: 'Lê o proximo valor inserido pelo usuário. (Dados de entrada)',
    methods: ['PGC Ex'],
    methodsDesc:
      'Ex é o escaninho onde os dados serão salvos.<br><br>Exemplo:<br>"PGC E15" salvará o valor no escaninho 15.',
  },
  'imp-info': {
    title: 'IMP',
    desc: 'Imprime o valor de um escaninho no console.',
    methods: ['IMP Ex'],
    methodsDesc:
      'Ex é o escaninho que contém o valor que será impresso.<br><br>Exemplo:<br>E16 = 2077;<br><br>"IMP E16" imprimirá o valor 2077 no console.',
  },
  'cop-info': {
    title: 'COP',
    desc: 'Copia os dados de um escaninho para o outro.',
    methods: ['COP Ex Ey'],
    methodsDesc:
      'Ex é o escaninho que possui os dados que serão copiados.<br>Ey é o escaninho onde os dados serão salvos.<br><br>Exemplo:<br>E15 = 17;<br><br>"COP E15 E14" salvará o valor 17 no escaninho 14.',
  },
  'som-info': {
    title: 'SOM',
    desc: 'Soma os dados de dois escaninhos e armazena em um terceiro escaninho.',
    methods: ['SOM Ex Ey Ez'],
    methodsDesc:
      'Ex é o escaninho que possui a primeira parcela da soma.<br>Ey é o escaninho que possui a segunda parcela da soma.<br>Ez é o escaninho onde o total será salvo.<br><br>Exemplo:<br>E16 = 2;<br>E15 = 3;<br><br>"SOM E16 E15 E16" salvará o valor 5 no escaninho 16.',
  },
  'sub-info': {
    title: 'SUB',
    desc: 'Subtrai os dados de um escaninho e armazena a diferença em outro escaninho.',
    methods: ['SUB Ex Ey Ez'],
    methodsDesc:
      'Ex é o escaninho que possui o minuendo.<br>Ey é o escaninho que possui o subtraendo.<br>Ez é o escaninho onde a diferença será salva.<br><br>Exemplo:<br>E16 = 2;<br>E15 = 3;<br><br>"SUB E16 E15 E15" salvará o valor -1 no escaninho 15.',
  },
  'mul-info': {
    title: 'MUL',
    desc: 'Multiplica o valor de dois escaninhos e armazena o produto em um terceiro escaninho.',
    methods: ['MUL Ex Ey Ez'],
    methodsDesc:
      'Ex é o escaninho que possui o primeiro fator.<br>Ey é o escaninho que possui o segundo fator.<br>Ez é o escaninho onde o produto será salvo.<br><br>Exemplo:<br>E16 = 8;<br>E15 = 5;<br><br>"MUL E16 E15 E14" salvará o valor 40 no escaninho 14.',
  },
  'div-info': {
    title: 'DIV',
    desc: 'Divide o valor de um escaninho e armazena o quociente em outro escaninho.',
    methods: ['DIV Ex Ey Ez'],
    methodsDesc:
      'Ex é o escaninho que possui o dividendo.<br>Ey é o escaninho que possui o divisor.<br>Ez é o escaninho onde o quociente será salvo.<br><br>Exemplo:<br>E16 = 17;<br>E15 = 3;<br><br>"DIV E16 E15 E14" salvará o valor 5 no escaninho 14.<br>Note que o resto da divisão (2, nesse caso) é perdido no processo.',
  },
  'vt-info': {
    title: 'VT',
    desc: 'Faz o programa ir à um determinado escaninho.',
    methods: ['VT Ex'],
    methodsDesc:
      'Ex é o escaninho de destino.<br><br>Exemplo:<br>E01 = IMP E16;<br>E02 = VT E01;<br>E16 = 42;<br><br>O programa acima imprimirá o valor 42 no console repetidamente atéque alguém force o programa a parar.<br><br>Isso acontece porque o programa executa o comando IMP E16 armazenado no escaninho 1 e avança para o escaninho 2.<br>O escaninho 2 por sua vez manda o programa voltar para o escaninho 1, reiniciando o ciclo. ',
  },
  'se-info': {
    title: 'SE',
    desc: 'Faz o programa ir à um determinado escaninho caso sua condição seja verdadeira. Caso contrário, ele avançará para o próximo escaninho.',
    methods: ['SE Ex &lt Ey Ez', 'SE Ex &gt Ey Ez', 'SE Ex = Ey Ez'],
    methodsDesc:
      'Ex é o primeiro escaninho de comparação.<br>Ey é o segundo escaninho de comparação.<br>Ez é o escaninho de destino.<br>"&lt" é o símbolo matemático que significa "menor que".<br>"&gt" é o símbolo matemático que significa "maior que".<br>"=" é o símbolo matemático que signifca "igual à".<br><br>Exemplos:<br>E09 = 7;<br>E10 = 8;<br>E11 = 9;<br><br> Caso o escaninho 2 possua o comando "SE E10 &lt E09 E01", o computador simplificado analisará se E10 é menor que E09 e então confirmará que não e ao invés de ir para E01, avançará para o próximo escaninho, que nesse caso é E03.<br><br>Caso o escaninho 2 possua o comando "SE E10 &lt E11 E01", o computador simplificado analisará se E10 é menor que E1 e então confirmará que sim e irá para E01, repetindo infinitamente.<br><br>',
  },
  'pare-info': {
    title: 'PARE',
    desc: 'Para a execução do programa.',
    methods: ['PARE'],
    methodsDesc: '',
  },
}
