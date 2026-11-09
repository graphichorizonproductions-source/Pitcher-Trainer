/* ===== SECTION 1: What Notes Mean ===== */
(() => {
const pq = [
  Q('What does "pitch" mean?', '¿Qué significa "tono" (altura)?', [['How high or low a sound is', 'Qué tan agudo o grave es un sonido'], ['How loud a sound is', 'Qué tan fuerte es un sonido'], ['How long a sound lasts', 'Cuánto dura un sonido']], 0, 'Pitch is how high or low a sound is. Loud and long are different things.', 'El tono es qué tan agudo o grave es un sonido. Fuerte y largo son otras cosas.'),
  Q('On a piano, which side has the high notes?', 'En un piano, ¿de qué lado están las notas agudas?', [['The right side', 'El lado derecho'], ['The left side', 'El lado izquierdo'], ['The middle', 'El centro']], 0, 'Going right on the piano makes the notes higher.', 'Hacia la derecha del piano las notas se vuelven más agudas.'),
  Q('A big drum makes a ___ sound.', 'Un tambor grande hace un sonido ___.', [['low', 'grave'], ['high', 'agudo'], ['quiet', 'suave']], 0, 'Big things usually make low sounds.', 'Las cosas grandes suelen hacer sonidos graves.')
];
const tq = [
  Q('A bird chirping is a ___ sound.', 'El canto de un pájaro es un sonido ___.', [['high', 'agudo'], ['low', 'grave']], 0),
  Q('What is a note?', '¿Qué es una nota?', [['One pitch that has a name', 'Un tono que tiene nombre'], ['A very loud sound', 'Un sonido muy fuerte'], ['A whole song', 'Una canción completa']], 0),
  QM('Which of these are HIGH sounds?', '¿Cuáles de estos son sonidos AGUDOS?', [['A whistle', 'Un silbido'], ['A bird chirping', 'Un pájaro cantando'], ['A truck rumbling', 'Un camión retumbando'], ['A tiny bell', 'Una campanita']], [0, 1, 3]),
  Q('What should you train first, before singing?', '¿Qué debes entrenar primero, antes de cantar?', [['Your ears', 'Tus oídos'], ['Your volume', 'Tu volumen'], ['Your speed', 'Tu velocidad']], 0),
  Q('Which is easiest to hear?', '¿Qué es más fácil de oír?', [['Notes far apart', 'Notas muy separadas'], ['Notes very close together', 'Notas muy juntas'], ['They are the same', 'Es igual']], 0),
  QM('Select everything that is TRUE about pitch.', 'Selecciona todo lo que es VERDAD sobre el tono.', [['Pitch is how high or low a sound is', 'El tono es qué tan agudo o grave es un sonido'], ['Pitch is how loud a sound is', 'El tono es qué tan fuerte es un sonido'], ['Bigger gaps between notes are easier to hear', 'Las separaciones grandes entre notas son más fáciles de oír'], ['Songs are made of notes', 'Las canciones están hechas de notas']], [0, 2, 3]),
  Q('On a piano, notes toward the left sound...', 'En un piano, las notas hacia la izquierda suenan...', [['Lower', 'Más graves'], ['Higher', 'Más agudas'], ['Louder', 'Más fuertes']], 0),
  Q('A song is mostly made of...', 'Una canción está hecha principalmente de...', [['Notes in a row', 'Notas una tras otra'], ['Only words', 'Solo palabras'], ['Only drums', 'Solo tambores']], 0),
  QM('Which are TRUE?', '¿Cuáles son VERDAD?', [['You can train your ear with practice', 'Puedes entrenar tu oído con práctica'], ['Some people can never learn', 'Algunas personas nunca pueden aprender'], ['Hearing comes before singing', 'Oír viene antes de cantar'], ['Only talented people can sing', 'Solo los talentosos pueden cantar']], [0, 2])
];
LEVELS.push({ id:1, sec:1, pass:80,
  name:b('High and Low Sounds', 'Sonidos agudos y graves'),
  desc:b('What a note really is, and how to train your ear to hear high and low.', 'Qué es de verdad una nota, y cómo entrenar tu oído para oír lo agudo y lo grave.'),
  lesson:[
    LS('What is a note?', '¿Qué es una nota?', 'Every sound has a pitch. Pitch means how high or low the sound is. A bird chirping is high. A big truck rumbling is low. A note is one pitch that has a name. A song is just notes lined up one after another, like words in a sentence.', 'Todo sonido tiene un tono. El tono es qué tan agudo o grave es el sonido. Un pájaro cantando es agudo. Un camión grande retumbando es grave. Una nota es un tono que tiene nombre. Una canción son solo notas una tras otra, como las palabras en una oración.', { play:[0, 12], keys:true }),
    LS('High and low on the piano', 'Agudo y grave en el piano', 'On a piano, the keys on the left make low sounds and the keys on the right make high sounds. When you go to the right, the sound goes up. When you go to the left, the sound goes down. Your voice works the same way. Low notes feel deep and full. High notes feel lighter and brighter.', 'En un piano, las teclas de la izquierda hacen sonidos graves y las teclas de la derecha hacen sonidos agudos. Cuando vas a la derecha, el sonido sube. Cuando vas a la izquierda, el sonido baja. Tu voz funciona igual. Las notas graves se sienten profundas y llenas. Las notas agudas se sienten más ligeras y brillantes.', { play:[0, 2, 4, 5, 7, 9, 11, 12, null, 12, 11, 9, 7, 5, 4, 2, 0], keys:true }),
    LS('Your ears come first', 'Primero tus oídos', 'Singing starts with listening. If your ear cannot tell the difference between two notes, your voice cannot copy them. This is normal, and it is completely trainable, like a muscle. So in this first level you will not sing at all. You will just train your ears to hear high, low, and the same.', 'Cantar empieza escuchando. Si tu oído no distingue la diferencia entre dos notas, tu voz no puede copiarlas. Esto es normal, y se puede entrenar por completo, como un músculo. Por eso en este primer nivel no vas a cantar nada. Solo vas a entrenar tus oídos para oír agudo, grave e igual.'),
    LS('Big gaps first, small gaps later', 'Primero separaciones grandes, luego pequeñas', 'Notes that are far apart are easy to tell apart. Notes that are close together are much harder. That is why practice starts with big gaps and slowly gets smaller. By the test you will be hearing small differences. Take your time, and listen with your eyes closed if it helps.', 'Las notas muy separadas son fáciles de distinguir. Las notas muy juntas son mucho más difíciles. Por eso la práctica empieza con separaciones grandes y poco a poco se hacen más pequeñas. En la prueba estarás oyendo diferencias pequeñas. Tómate tu tiempo, y escucha con los ojos cerrados si te ayuda.', { play:[0, 12, null, 0, 4, null, 0, 1] })
  ],
  pq, tq,
  tiers:[
    { goal:6, d:b('Practice 1. Big gaps. These are easy to hear.', 'Práctica 1. Separaciones grandes. Son fáciles de oír.'), g:mixQ(pq, .25, () => earHL([7, 8, 9, 12], false)) },
    { goal:8, d:b('Practice 2. Medium gaps. Listen carefully.', 'Práctica 2. Separaciones medianas. Escucha con cuidado.'), g:mixQ(pq, .15, () => earHL([3, 4, 5], false)) },
    { goal:8, d:b('Practice 3. Small gaps, and sometimes the notes are the same. This is like the test.', 'Práctica 3. Separaciones pequeñas, y a veces las notas son iguales. Es como la prueba.'), g:() => earHL([2, 3, 4], true) }
  ],
  testGen:() => times(7, () => earHL([2, 3, 4, 5], true))
});

const pq2 = [
  Q('How many note names are there before they start over?', '¿Cuántos nombres de nota hay antes de que se repitan?', [['Seven', 'Siete'], ['Five', 'Cinco'], ['Twelve', 'Doce']], 0, 'There are seven names: Do Re Mi Fa Sol La Ti. Then they start again, higher.', 'Hay siete nombres: Do Re Mi Fa Sol La Si. Luego empiezan otra vez, más agudos.'),
  Q('Which note comes right after Mi?', '¿Qué nota viene justo después de Mi?', [['Fa', 'Fa'], ['Re', 'Re'], ['Sol', 'Sol']], 0, 'The order is Do, Re, Mi, Fa, Sol, La.', 'El orden es Do, Re, Mi, Fa, Sol, La.'),
  Q('The letter C is the same note as...', 'La letra C es la misma nota que...', [['Do', 'Do'], ['Sol', 'Sol'], ['La', 'La']], 0, 'C is Do, D is Re, E is Mi, F is Fa, G is Sol, A is La, B is Ti.', 'C es Do, D es Re, E es Mi, F es Fa, G es Sol, A es La, B es Si.')
];
const tq2 = [
  Q('Which letter name matches La?', '¿Qué letra corresponde a La?', ['A', 'B', 'E'], 0),
  Q('After the last note of the pattern, what comes next?', 'Después de la última nota del patrón, ¿qué viene?', [['Do again, but higher', 'Do otra vez, pero más agudo'], ['Nothing', 'Nada'], ['Fa', 'Fa']], 0),
  QM('Which of these are real note names?', '¿Cuáles de estos son nombres reales de notas?', ['Sol', 'Fa', 'Zo', 'La'], [0, 1, 3]),
  Q('A sharp (#) means the note is...', 'Un sostenido (#) significa que la nota es...', [['A tiny step higher', 'Un pasito más aguda'], ['A tiny step lower', 'Un pasito más grave'], ['Twice as loud', 'El doble de fuerte']], 0),
  Q('A flat (b) means the note is...', 'Un bemol (b) significa que la nota es...', [['A tiny step lower', 'Un pasito más grave'], ['A tiny step higher', 'Un pasito más aguda'], ['Twice as long', 'El doble de larga']], 0),
  QM('Select the pairs that are the SAME note.', 'Selecciona los pares que son la MISMA nota.', [['Sol and G', 'Sol y G'], ['Mi and E', 'Mi y E'], ['Do and D', 'Do y D'], ['Re and D', 'Re y D']], [0, 1, 3]),
  Q('On the piano, how are the black keys grouped?', 'En el piano, ¿cómo están agrupadas las teclas negras?', [['In twos and threes', 'De dos en dos y de tres en tres'], ['All together', 'Todas juntas'], ['One at a time', 'De una en una']], 0),
  Q('Do (C) is the white key just left of...', 'Do (C) es la tecla blanca justo a la izquierda de...', [['The group of two black keys', 'El grupo de dos teclas negras'], ['The group of three black keys', 'El grupo de tres teclas negras'], ['The end of the piano', 'El final del piano']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['C# and Db are the same sound', 'C# y Db son el mismo sonido'], ['There are seven main note names', 'Hay siete nombres principales de nota'], ['Sharps are always lower than flats', 'Los sostenidos siempre son más graves que los bemoles'], ['The names repeat higher and lower', 'Los nombres se repiten más agudos y más graves']], [0, 1, 3])
];
LEVELS.push({ id:2, sec:1, pass:80,
  name:b('Note Names', 'Nombres de las notas'),
  desc:b('Do Re Mi and the letters C D E. Learn the names, the piano map, and sharps and flats.', 'Do Re Mi y las letras C D E. Aprende los nombres, el mapa del piano, y los sostenidos y bemoles.'),
  lesson:[
    LS('Do Re Mi', 'Do Re Mi', 'There are seven note names: Do, Re, Mi, Fa, Sol, La, and Ti. After Ti, the names start over with Do again, but higher. Many churches use letters instead: C, D, E, F, G, A, B. They are the same notes. Do is C, Re is D, Mi is E, Fa is F, Sol is G, La is A, and Ti is B.', 'Hay siete nombres de nota: Do, Re, Mi, Fa, Sol, La y Si. Después de Si, los nombres empiezan otra vez con Do, pero más agudo. Muchas iglesias usan letras: C, D, E, F, G, A, B. Son las mismas notas. Do es C, Re es D, Mi es E, Fa es F, Sol es G, La es A y Si es B.', { play:[0, 2, 4, 5, 7, 9, 11, 12], keys:true }),
    LS('The piano map', 'El mapa del piano', 'The white keys on a piano are the seven main notes. The black keys sit between them, in groups of two and then three. This pattern is your map. Do, which is C, is always the white key just to the left of the group of two black keys. Find that key and you can find every other note.', 'Las teclas blancas del piano son las siete notas principales. Las teclas negras están entre ellas, en grupos de dos y luego de tres. Este patrón es tu mapa. Do, que es C, siempre es la tecla blanca justo a la izquierda del grupo de dos teclas negras. Encuentra esa tecla y podrás encontrar todas las demás notas.', { play:[0, 2, 4, 5, 7], keys:true }),
    LS('Sharps and flats', 'Sostenidos y bemoles', 'The black keys have names too. A sharp, written with a pound sign, means a tiny step higher. A flat, written like a small b, means a tiny step lower. The black key between Do and Re is Do sharp, and it is also Re flat. It is one sound with two names. Do not worry, you will mostly use the white keys for now.', 'Las teclas negras también tienen nombre. Un sostenido, que se escribe con un numeral, significa un pasito más agudo. Un bemol, que se escribe como una b pequeña, significa un pasito más grave. La tecla negra entre Do y Re es Do sostenido, y también es Re bemol. Es un solo sonido con dos nombres. No te preocupes, por ahora usarás sobre todo las teclas blancas.', { play:[0, 1, 2], keys:true }),
    LS('Why names matter', 'Por qué importan los nombres', 'When your music director says start on Sol, or we are in the key of G, you will know exactly what that means. Names let the whole team talk about the same note. In this app, Do is always your starting note. Every other note is measured from it.', 'Cuando tu director de música diga empieza en Sol, o estamos en la tonalidad de G, sabrás exactamente qué significa. Los nombres permiten que todo el equipo hable de la misma nota. En esta app, Do siempre es tu nota inicial. Todas las demás notas se miden desde ella.')
  ],
  pq:pq2, tq:tq2,
  tiers:[
    { goal:6, d:b('Practice 1. Read the keyboard. Which note is lit up?', 'Práctica 1. Lee el teclado. ¿Qué nota está iluminada?'), g:mixQ(pq2, .25, () => nameKeys([0, 2, 4, 5, 7])) },
    { goal:8, d:b('Practice 2. Now all the white keys, and what comes next.', 'Práctica 2. Ahora todas las teclas blancas, y qué viene después.'), g:mixQ(pq2, .15, () => Math.random() < .5 ? nameKeys([0, 2, 4, 5, 7, 9, 11]) : afterKey()) },
    { goal:8, d:b('Practice 3. Use your ears. You hear Do first, then a second note. Which one is it?', 'Práctica 3. Usa tus oídos. Oyes Do primero y luego una segunda nota. ¿Cuál es?'), g:() => earName([0, 4, 7]) }
  ],
  testGen:() => [nameKeys([0, 2, 4, 5, 7, 9, 11]), nameKeys([1, 3, 6, 8, 10, 0, 5]), afterKey(), afterKey(), earName([0, 2, 4, 5, 7]), earName([0, 4, 5, 7]), earName([0, 2, 7])]
});

const pq3 = [
  Q('What sound is best for singing a note?', '¿Qué sonido es mejor para cantar una nota?', [['A relaxed, open "ah"', 'Una "a" abierta y relajada'], ['A loud shout', 'Un grito fuerte'], ['A whisper', 'Un susurro']], 0, 'An open, relaxed ah keeps your throat free.', 'Una "a" abierta y relajada mantiene tu garganta libre.'),
  Q('The ball is on the LEFT of the meter. You are...', 'La bolita está a la IZQUIERDA del medidor. Estás...', [['Too low. Go a little higher.', 'Muy grave. Sube un poquito.'], ['Too high. Go lower.', 'Muy agudo. Baja.'], ['Perfect.', 'Perfecto.']], 0, 'Left means low, so move your voice up a little.', 'Izquierda significa grave, así que sube tu voz un poquito.'),
  Q('Which octave should you sing in?', '¿En qué octava debes cantar?', [['Any one that is comfortable', 'Cualquiera que te sea cómoda'], ['Only the highest', 'Solo la más aguda'], ['Only the lowest', 'Solo la más grave']], 0, 'The same note in a different octave still counts.', 'La misma nota en otra octava también cuenta.')
];
const tq3 = [
  Q('The best way to sing a note is...', 'La mejor forma de cantar una nota es...', [['Soft and steady', 'Suave y firme'], ['Loud and wild', 'Fuerte y desordenada'], ['With a tight throat', 'Con la garganta apretada']], 0),
  Q('The ball is on the RIGHT. What do you do?', 'La bolita está a la DERECHA. ¿Qué haces?', [['Go a little lower', 'Bajas un poquito'], ['Go higher', 'Subes'], ['Stop singing', 'Dejas de cantar']], 0),
  QM('Which things help you match a note?', '¿Qué cosas te ayudan a igualar una nota?', [['Listening carefully first', 'Escuchar con cuidado primero'], ['A relaxed open "ah"', 'Una "a" abierta y relajada'], ['Shouting', 'Gritar'], ['Making small adjustments', 'Hacer ajustes pequeños']], [0, 1, 3]),
  Q('Singing a note starts with...', 'Cantar una nota empieza con...', [['Listening', 'Escuchar'], ['Shouting', 'Gritar'], ['Letting out all your air', 'Soltar todo tu aire']], 0),
  Q('A man and a woman singing the same note are usually...', 'Un hombre y una mujer cantando la misma nota suelen estar...', [['An octave apart', 'Separados por una octava'], ['On exactly the same pitch', 'En exactamente el mismo tono'], ['A step apart', 'A un paso de distancia']], 0),
  QM('Which statements about the meter are TRUE?', '¿Cuáles afirmaciones sobre el medidor son VERDAD?', [['Green means you are on the note', 'Verde significa que estás en la nota'], ['Left means too low', 'Izquierda significa muy grave'], ['Right means too low', 'Derecha significa muy grave'], ['It shows pitch, not volume', 'Muestra el tono, no el volumen']], [0, 1, 3]),
  Q('If you are a little off the note, you should...', 'Si estás un poco fuera de la nota, debes...', [['Make small adjustments', 'Hacer ajustes pequeños'], ['Jump far away', 'Saltar lejos'], ['Give up', 'Rendirte']], 0),
  Q('Why is "ah" a good vowel to practice on?', '¿Por qué "a" es una buena vocal para practicar?', [['Your mouth is open and relaxed', 'Tu boca está abierta y relajada'], ['It is the loudest', 'Es la más fuerte'], ['It is the shortest', 'Es la más corta']], 0),
  QM('Select everything you should AVOID when singing.', 'Selecciona todo lo que debes EVITAR al cantar.', [['Shouting', 'Gritar'], ['Squeezing your throat', 'Apretar la garganta'], ['Staying relaxed', 'Mantenerte relajado'], ['Pushing too hard', 'Forzar demasiado']], [0, 1, 3])
];
LEVELS.push({ id:3, sec:1, pass:80,
  name:b('Match a Note', 'Iguala una nota'),
  desc:b('Your first singing level. Hear one note, then sing it back using the pitch meter.', 'Tu primer nivel de canto. Escucha una nota y cántala usando el medidor de tono.'),
  lesson:[
    LS('Singing is copying', 'Cantar es copiar', 'To sing a note, you hear it, keep it in your mind, and then make your voice match it. Your voice is an instrument you cannot see, so it is hard to know if you are right. That is why this app has a pitch meter. It shows you, in real time, if you are too low, too high, or right on the note.', 'Para cantar una nota, la oyes, la guardas en tu mente y luego haces que tu voz la iguale. Tu voz es un instrumento que no puedes ver, así que es difícil saber si vas bien. Por eso esta app tiene un medidor de tono. Te muestra, en tiempo real, si estás muy grave, muy agudo o justo en la nota.'),
    LS('How to make the sound', 'Cómo hacer el sonido', 'Use a relaxed, open ah, like when the doctor looks at your throat. Take a low, quiet breath. Then let the sound out smoothly. Do not push and do not shout. A soft, steady sound is always better than a loud, wild one. If it feels tight in your throat, you are doing too much.', 'Usa una a abierta y relajada, como cuando el doctor te revisa la garganta. Toma un aire bajo y tranquilo. Luego deja salir el sonido suavemente. No empujes ni grites. Un sonido suave y firme siempre es mejor que uno fuerte y desordenado. Si sientes tensión en la garganta, estás haciendo demasiado.'),
    LS('Reading the meter', 'Cómo leer el medidor', 'The glowing ball shows your pitch. If the ball is on the left, you are too low, so go a little higher. If it is on the right, you are too high, so go a little lower. When the ball turns green in the middle, you are on the note. Make small moves. Tiny changes in your voice make big changes on the meter.', 'La bolita brillante muestra tu tono. Si está a la izquierda, estás muy grave, así que sube un poquito. Si está a la derecha, estás muy agudo, así que baja un poquito. Cuando la bolita se pone verde en el centro, estás en la nota. Haz movimientos pequeños. Cambios diminutos en tu voz hacen cambios grandes en el medidor.'),
    LS('Any octave is fine', 'Cualquier octava sirve', 'Men and women usually sing the same song one octave apart, and that is perfectly fine. In this app, the same note in any octave counts as correct. Sing in whatever octave feels comfortable. Never strain to reach a note that is too high or too low for you.', 'Los hombres y las mujeres suelen cantar la misma canción con una octava de diferencia, y eso está perfectamente bien. En esta app, la misma nota en cualquier octava cuenta como correcta. Canta en la octava que te sea cómoda. Nunca te esfuerces por alcanzar una nota demasiado aguda o grave para ti.')
  ],
  pq:pq3, tq:tq3,
  tiers:[
    { goal:6, d:b('Practice 1. Easy notes. I will say when to listen and when to sing.', 'Práctica 1. Notas fáciles. Te diré cuándo escuchar y cuándo cantar.'), g:mixQ(pq3, .2, () => SING([pk([0, 4, 7])], { tol:60, hold:.7 })) },
    { goal:8, d:b('Practice 2. More notes, and a smaller target zone.', 'Práctica 2. Más notas, y una zona más pequeña.'), g:mixQ(pq3, .1, () => SING([pk([0, 2, 4, 5, 7, 9])], { tol:52, hold:.8 })) },
    { goal:8, d:b('Practice 3. Any note, and you hold it a little longer. Just like the test.', 'Práctica 3. Cualquier nota, y la mantienes un poco más. Igual que la prueba.'), g:() => SING([rnd(0, 11)], { tol:45, hold:1 }) }
  ],
  testGen:() => times(6, () => SING([rnd(0, 9)], { tol:45, hold:.9 }))
});
})();
