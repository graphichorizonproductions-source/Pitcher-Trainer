/* ===== SECTION 2: Steps and Scales ===== */
(() => {
/* ---------- L4 Steps ---------- */
const pq = [
  Q('How many half steps make one whole step?', '¿Cuántos medios pasos hacen un paso entero?', ['2', '1', '3'], 0, 'Two half steps make one whole step.', 'Dos medios pasos hacen un paso entero.'),
  Q('Between which two notes is there only a half step?', '¿Entre cuáles dos notas hay solo un medio paso?', [['Mi and Fa', 'Mi y Fa'], ['Do and Re', 'Do y Re'], ['Fa and Sol', 'Fa y Sol']], 0, 'Mi and Fa have no black key between them, so they are only a half step apart.', 'Entre Mi y Fa no hay tecla negra, así que solo hay un medio paso.'),
  Q('Do, Re, Mi moves by...', 'Do, Re, Mi se mueve por...', [['Steps going up', 'Pasos hacia arriba'], ['Big jumps', 'Saltos grandes'], ['Steps going down', 'Pasos hacia abajo']], 0, 'Each note is right next to the one before it, so these are steps.', 'Cada nota está justo al lado de la anterior, así que son pasos.')
];
const tq = [
  Q('A half step is...', 'Un medio paso es...', [['The smallest distance between two notes', 'La distancia más pequeña entre dos notas'], ['Two notes apart', 'Dos notas de distancia'], ['The same note', 'La misma nota']], 0),
  Q('Do to Re is a...', 'De Do a Re es un...', [['Whole step', 'Paso entero'], ['Half step', 'Medio paso'], ['Octave', 'Octava']], 0),
  QM('Which pairs are only a HALF step apart?', '¿Qué pares están a solo un MEDIO paso?', [['Mi and Fa', 'Mi y Fa'], ['Ti and Do', 'Si y Do'], ['Do and Re', 'Do y Re'], ['Sol and La', 'Sol y La']], [0, 1]),
  Q('Going from Do to Mi, you...', 'Al ir de Do a Mi, tú...', [['Skip over Re', 'Saltas sobre Re'], ['Step to Re', 'Pasas por Re'], ['Stay on the same note', 'Te quedas en la misma nota']], 0),
  Q('Two half steps equal...', 'Dos medios pasos equivalen a...', [['One whole step', 'Un paso entero'], ['An octave', 'Una octava'], ['A skip of a fifth', 'Un salto de quinta']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['A half step is smaller than a whole step', 'Un medio paso es más pequeño que un paso entero'], ['Mi to Fa is a whole step', 'De Mi a Fa es un paso entero'], ['Do to Re is a whole step', 'De Do a Re es un paso entero'], ['Going up makes notes higher', 'Subir hace las notas más agudas']], [0, 2, 3]),
  Q('Singing the same note again and again is called...', 'Cantar la misma nota una y otra vez se llama...', [['A repeated note', 'Una nota repetida'], ['A step', 'Un paso'], ['A jump', 'Un salto']], 0),
  Q('On the piano, a half step is...', 'En el piano, un medio paso es...', [['The very next key, black or white', 'La tecla siguiente, negra o blanca'], ['Always a black key', 'Siempre una tecla negra'], ['Two keys over', 'Dos teclas más allá']], 0),
  QM('Which moves are STEPS (not skips)?', '¿Cuáles movimientos son PASOS (no saltos)?', [['Do to Re', 'Do a Re'], ['Re to Mi', 'Re a Mi'], ['Do to Mi', 'Do a Mi'], ['Mi to Fa', 'Mi a Fa']], [0, 1, 3])
];
LEVELS.push({ id:4, sec:2, pass:80,
  name:b('Steps', 'Pasos'),
  desc:b('Half steps and whole steps, and singing two and three notes in a row.', 'Medios pasos y pasos enteros, y cómo cantar dos y tres notas seguidas.'),
  lesson:[
    LS('The smallest step', 'El paso más pequeño', 'The smallest distance in most music is called a half step. On a piano it is just the very next key, black or white. Two half steps make a whole step. Steps are how a melody walks. Most songs move mostly by steps, with a few jumps here and there.', 'La distancia más pequeña en casi toda la música se llama medio paso. En el piano es solo la tecla siguiente, negra o blanca. Dos medios pasos hacen un paso entero. Los pasos son cómo camina una melodía. La mayoría de las canciones se mueven sobre todo por pasos, con algunos saltos aquí y allá.', { play:[0, 1, 2], keys:true }),
    LS('Whole steps and half steps in Do Re Mi', 'Pasos enteros y medios pasos en Do Re Mi', 'Do to Re is a whole step. Re to Mi is a whole step. But Mi to Fa is only a half step, because there is no black key between them. Ti to Do is also a half step. Listen to the difference. The half step sounds tighter and closer.', 'De Do a Re hay un paso entero. De Re a Mi hay un paso entero. Pero de Mi a Fa solo hay un medio paso, porque no hay tecla negra entre ellas. De Si a Do también hay un medio paso. Escucha la diferencia. El medio paso suena más apretado y cercano.', { play:[0, 2, 4, 5], keys:true }),
    LS('Steps versus skips', 'Pasos contra saltos', 'When a melody moves to the next note name, that is a step. When it skips over a note, that is a skip. Do to Re is a step. Do to Mi is a skip, because it jumps over Re. Learning to feel the difference between a step and a skip is the start of real pitch skill.', 'Cuando una melodía se mueve al siguiente nombre de nota, eso es un paso. Cuando salta sobre una nota, eso es un salto. De Do a Re es un paso. De Do a Mi es un salto, porque pasa por encima de Re. Aprender a sentir la diferencia entre un paso y un salto es el comienzo de una habilidad real con el tono.', { play:[0, 2, null, 0, 4], keys:true }),
    LS('Singing steps', 'Cómo cantar pasos', 'When you sing a step, move your voice a small amount, like going up one stair. Do not scoop up from below. Hear the next note in your head first, then place your voice right on it. Listen to each note, sing it, then check the meter. Small and clean is the goal.', 'Cuando cantes un paso, mueve tu voz una cantidad pequeña, como subir un escalón. No te deslices desde abajo. Oye la siguiente nota en tu cabeza primero, y luego coloca tu voz justo en ella. Escucha cada nota, cántala y revisa el medidor. Pequeño y limpio es la meta.')
  ],
  pq, tq,
  tiers:[
    { goal:8, d:b('Practice 1. Sing two notes: Do, then Re.', 'Práctica 1. Canta dos notas: Do, y luego Re.'), g:mixQ(pq, .2, () => SING(pk([[0, 2], [2, 4], [4, 5]]), { tol:55, hold:.7 })) },
    { goal:9, d:b('Practice 2. Is it a step or a jump? Then sing three notes in a row.', 'Práctica 2. ¿Es un paso o un salto? Luego canta tres notas seguidas.'), g:() => Math.random() < .5 ? earStepJump() : SING(pk([[0, 2, 4], [2, 4, 5], [4, 5, 7]]), { tol:50, hold:.7 }) },
    { goal:12, d:b('Practice 3. Listen to the whole pattern first, then sing it back from memory.', 'Práctica 3. Escucha todo el patrón primero y luego cántalo de memoria.'), g:() => Math.random() < .3 ? earStepJump() : SING(pk([[0, 2, 4], [4, 2, 0], [2, 4, 2], [4, 5, 4]]), { tol:45, hold:.6, echo:true }) }
  ],
  testGen:() => [earStepJump(), earStepJump(), earStepJump(), SING([0, 2], { tol:45 }), SING([2, 4], { tol:45 }), SING([0, 2, 4], { tol:45 }), SING([4, 2, 0], { tol:45, echo:true })]
});

/* ---------- L5 Major scale ---------- */
const pq5 = [
  Q('How many notes are in a major scale, counting the high Do?', '¿Cuántas notas tiene una escala mayor, contando el Do agudo?', ['8', '7', '12'], 0, 'Do Re Mi Fa Sol La Ti and then Do again makes eight.', 'Do Re Mi Fa Sol La Si y luego Do otra vez son ocho.'),
  Q('Where are the half steps in the major scale?', '¿Dónde están los medios pasos en la escala mayor?', [['Mi to Fa, and Ti to Do', 'De Mi a Fa, y de Si a Do'], ['Do to Re, and Re to Mi', 'De Do a Re, y de Re a Mi'], ['Fa to Sol, and Sol to La', 'De Fa a Sol, y de Sol a La']], 0, 'Those are the two places with no black key between the notes.', 'Esos son los dos lugares donde no hay tecla negra entre las notas.'),
  Q('Which note feels like home in the scale?', '¿Qué nota se siente como el hogar en la escala?', [['Do', 'Do'], ['Re', 'Re'], ['Ti', 'Si']], 0, 'Do is the home note. The scale starts and ends there.', 'Do es la nota hogar. La escala empieza y termina ahí.')
];
const tq5 = [
  Q('The major scale pattern of steps is...', 'El patrón de pasos de la escala mayor es...', [['Whole, whole, half, whole, whole, whole, half', 'Entero, entero, medio, entero, entero, entero, medio'], ['Half, half, whole, half, half, half, whole', 'Medio, medio, entero, medio, medio, medio, entero'], ['Whole, half, whole, whole, half, whole, whole', 'Entero, medio, entero, entero, medio, entero, entero']], 0),
  Q('The word "scale" comes from an Italian word meaning...', 'La palabra "escala" viene de una palabra italiana que significa...', [['Ladder', 'Escalera'], ['Sing', 'Cantar'], ['Step', 'Paso']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['The scale has seven different note names', 'La escala tiene siete nombres de nota distintos'], ['The last note is Do again, higher', 'La última nota es Do otra vez, más aguda'], ['There are half steps after Mi and after Ti', 'Hay medios pasos después de Mi y después de Si'], ['There is a half step after Re', 'Hay un medio paso después de Re']], [0, 1, 2]),
  Q('Which note wants to move up to Do?', '¿Qué nota quiere subir a Do?', [['Ti', 'Si'], ['Fa', 'Fa'], ['Re', 'Re']], 0),
  Q('The note after Sol is...', 'La nota después de Sol es...', [['La', 'La'], ['Fa', 'Fa'], ['Ti', 'Si']], 0),
  QM('Select the WHOLE steps.', 'Selecciona los PASOS ENTEROS.', [['Do to Re', 'Do a Re'], ['Mi to Fa', 'Mi a Fa'], ['Fa to Sol', 'Fa a Sol'], ['Ti to Do', 'Si a Do']], [0, 2]),
  Q('How many whole steps are in the major scale pattern?', '¿Cuántos pasos enteros hay en el patrón de la escala mayor?', ['5', '7', '2'], 0),
  Q('When singing a scale, you should...', 'Al cantar una escala, debes...', [['Listen, then sing each note without rushing', 'Escuchar y luego cantar cada nota sin apurarte'], ['Sing as fast as you can', 'Cantar lo más rápido posible'], ['Hold your breath', 'Aguantar la respiración']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['The major scale sounds bright and complete', 'La escala mayor suena brillante y completa'], ['A major scale can only start on Do', 'Una escala mayor solo puede empezar en Do'], ['The same pattern works starting on any note', 'El mismo patrón funciona empezando en cualquier nota'], ['Half steps are between Re and Mi', 'Hay medios pasos entre Re y Mi']], [0, 2])
];
LEVELS.push({ id:5, sec:2, pass:80,
  name:b('The Major Scale', 'La escala mayor'),
  desc:b('Climb the whole ladder from Do to the next Do, and learn the pattern behind it.', 'Sube toda la escalera de Do al siguiente Do, y aprende el patrón detrás de ella.'),
  lesson:[
    LS('A ladder of eight notes', 'Una escalera de ocho notas', 'A scale is a ladder of notes in order. The word comes from the Italian word for ladder. The most common one is the major scale: Do, Re, Mi, Fa, Sol, La, Ti, and Do again at the top. It is the sound of Do Re Mi. You have heard it your whole life, in almost every song.', 'Una escala es una escalera de notas en orden. La palabra viene de la palabra italiana para escalera. La más común es la escala mayor: Do, Re, Mi, Fa, Sol, La, Si, y Do otra vez arriba. Es el sonido de Do Re Mi. Lo has oído toda tu vida, en casi todas las canciones.', { play:[0, 2, 4, 5, 7, 9, 11, 12], keys:true }),
    LS('The secret pattern', 'El patrón secreto', 'Every major scale follows the same recipe: whole step, whole step, half step, whole step, whole step, whole step, half step. The half steps are between Mi and Fa, and between Ti and Do. That recipe works starting on any note. That is why a song can be moved to any key and still sound like the same song.', 'Toda escala mayor sigue la misma receta: paso entero, paso entero, medio paso, paso entero, paso entero, paso entero, medio paso. Los medios pasos están entre Mi y Fa, y entre Si y Do. Esa receta funciona empezando en cualquier nota. Por eso una canción se puede mover a cualquier tonalidad y seguir sonando como la misma canción.', { play:[0, 2, 4, 5], keys:true }),
    LS('Why Do feels like home', 'Por qué Do se siente como el hogar', 'Listen to the scale stop on Ti. It feels unfinished, like a sentence with no ending. Now listen when it lands on Do. It feels finished and at rest. Do is the home note. Ti wants to go up to it, and that pull is what gives music its feeling of tension and relief.', 'Escucha cómo la escala se detiene en Si. Se siente sin terminar, como una oración sin final. Ahora escucha cuando llega a Do. Se siente terminada y en reposo. Do es la nota hogar. Si quiere subir hasta ella, y esa atracción es lo que le da a la música su sensación de tensión y descanso.', { play:[0, 2, 4, 5, 7, 9, 11, null, 12], keys:true }),
    LS('How to sing a scale', 'Cómo cantar una escala', 'Do not rush. Hear each note, then place your voice on it. Each step should sound clearly different from the last. Take a fresh breath at the top if you need one. Keep your sound light on the way up. If you tighten or push as you climb, relax your jaw and let the notes come easily.', 'No te apures. Oye cada nota y luego coloca tu voz en ella. Cada paso debe sonar claramente distinto del anterior. Toma un aire nuevo arriba si lo necesitas. Mantén tu sonido ligero al subir. Si te tensas o empujas mientras subes, relaja la mandíbula y deja que las notas salgan con facilidad.')
  ],
  pq:pq5, tq:tq5,
  tiers:[
    { goal:8, d:b('Practice 1. The first four steps of the ladder: Do, Re, Mi, Fa.', 'Práctica 1. Los primeros cuatro escalones: Do, Re, Mi, Fa.'), g:mixQ(pq5, .15, () => SING([0, 2, 4, 5], { tol:52, hold:.7 })) },
    { goal:12, d:b('Practice 2. Climb the whole ladder, Do to the high Do.', 'Práctica 2. Sube toda la escalera, de Do al Do agudo.'), g:() => SING([0, 2, 4, 5, 7, 9, 11, 12], { tol:48, hold:.7 }) },
    { goal:14, d:b('Practice 3. Hear the notes first, then sing them back from memory.', 'Práctica 3. Escucha las notas primero y luego cántalas de memoria.'), g:() => SING(pk([[0, 2, 4, 5, 7], [2, 4, 5, 7, 9], [4, 5, 7, 9, 11]]), { tol:45, hold:.6, echo:true }) }
  ],
  testGen:() => [SING([0, 2, 4, 5, 7, 9, 11, 12], { tol:45 }), SING([0, 2, 4, 5, 7], { tol:45, echo:true })]
});

/* ---------- L6 Going down + patterns ---------- */
const pq6 = [
  Q('Descending means going...', 'Descender significa ir...', [['Down', 'Hacia abajo'], ['Up', 'Hacia arriba'], ['Sideways', 'De lado']], 0, 'Descending notes get lower and lower.', 'Las notas que descienden se vuelven cada vez más graves.'),
  Q('In Do Re Mi Re Do, where does the pattern turn around?', 'En Do Re Mi Re Do, ¿dónde da la vuelta el patrón?', [['On Mi', 'En Mi'], ['On Do', 'En Do'], ['On Re', 'En Re']], 0, 'It climbs to Mi and then comes back down.', 'Sube hasta Mi y luego vuelve a bajar.'),
  Q('Echo singing means...', 'Cantar en eco significa...', [['Hear it, then sing it back', 'Oírlo y luego cantarlo de vuelta'], ['Sing at the same time', 'Cantar al mismo tiempo'], ['Read the notes', 'Leer las notas']], 0, 'Echo means you listen first and copy from memory.', 'Eco significa que escuchas primero y copias de memoria.')
];
const tq6 = [
  Q('Ascending notes go...', 'Las notas que ascienden van...', [['Up', 'Hacia arriba'], ['Down', 'Hacia abajo'], ['Nowhere', 'A ningún lado']], 0),
  Q('A descending major scale starts on...', 'Una escala mayor descendente empieza en...', [['The high Do', 'El Do agudo'], ['The low Do', 'El Do grave'], ['Re', 'Re']], 0),
  QM('Which patterns turn around (change direction)?', '¿Qué patrones dan la vuelta (cambian de dirección)?', [['Do Re Mi Re Do', 'Do Re Mi Re Do'], ['Do Mi Sol Mi Do', 'Do Mi Sol Mi Do'], ['Do Re Mi Fa Sol', 'Do Re Mi Fa Sol'], ['Sol Fa Mi Fa Sol', 'Sol Fa Mi Fa Sol']], [0, 1, 3]),
  Q('To sing downward well, keep...', 'Para cantar bien hacia abajo, mantén...', [['Your breath steady', 'Tu aire constante'], ['Your shoulders tense', 'Tus hombros tensos'], ['Getting louder', 'Cada vez más volumen']], 0),
  Q('The up-and-down shape of a melody is called its...', 'La forma de subidas y bajadas de una melodía se llama...', [['Contour', 'Contorno'], ['Harmony', 'Armonía'], ['Tempo', 'Tempo']], 0),
  QM('Select the DESCENDING patterns.', 'Selecciona los patrones DESCENDENTES.', [['Sol Fa Mi Re', 'Sol Fa Mi Re'], ['Do Re Mi Fa', 'Do Re Mi Fa'], ['La Sol Fa Mi', 'La Sol Fa Mi'], ['Mi Fa Sol La', 'Mi Fa Sol La']], [0, 2]),
  Q('Echo singing trains your...', 'Cantar en eco entrena tu...', [['Memory for pitch', 'Memoria del tono'], ['Knees', 'Rodillas'], ['Volume', 'Volumen']], 0),
  Q('After hearing a pattern, you should...', 'Después de oír un patrón, debes...', [['Hold it in your mind, then sing', 'Guardarlo en tu mente y luego cantar'], ['Sing before it ends', 'Cantar antes de que termine'], ['Forget it', 'Olvidarlo']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['Going down can be harder than going up', 'Bajar puede ser más difícil que subir'], ['You should rush through patterns', 'Debes apurarte en los patrones'], ['Ear memory improves with practice', 'La memoria del oído mejora con práctica'], ['A melody can go up, down, or stay the same', 'Una melodía puede subir, bajar o quedarse igual']], [0, 2, 3])
];
LEVELS.push({ id:6, sec:2, pass:80,
  name:b('Down the Ladder and Patterns', 'Bajar la escalera y patrones'),
  desc:b('Sing down the scale, change direction, and copy short patterns from memory.', 'Canta bajando la escala, cambia de dirección y copia patrones cortos de memoria.'),
  lesson:[
    LS('Going down', 'Bajar', 'Descending means going down. Singing down the scale is trickier than going up, because singers tend to let the sound sag and go flat as the notes get lower. Keep your breath steady and keep the same energy all the way down. Think of walking down stairs carefully, one step at a time, not falling down them.', 'Descender significa ir hacia abajo. Cantar bajando la escala es más difícil que subir, porque los cantantes suelen dejar caer el sonido y quedarse bajos mientras las notas se hacen más graves. Mantén tu aire constante y la misma energía hasta el final. Piensa en bajar escaleras con cuidado, un escalón a la vez, no en caerte por ellas.', { play:[12, 11, 9, 7, 5, 4, 2, 0], keys:true }),
    LS('Direction and contour', 'Dirección y contorno', 'Every melody goes up, goes down, or stays on the same note. The shape of those ups and downs is called the contour of the melody. Before you sing, listen for the contour. Does it climb, fall, or turn around? Hearing the shape first makes the notes much easier to find.', 'Toda melodía sube, baja o se queda en la misma nota. La forma de esas subidas y bajadas se llama el contorno de la melodía. Antes de cantar, escucha el contorno. ¿Sube, baja o da la vuelta? Oír la forma primero hace que las notas sean mucho más fáciles de encontrar.', { play:[0, 2, 4, 2, 0], keys:true }),
    LS('Patterns', 'Patrones', 'Musicians practice patterns to train their ears. A pattern like Do, Re, Mi, Re, Do goes up and comes back. Patterns teach your voice to change direction smoothly, which real songs do all the time. Start slow. Once a pattern is easy, try it starting on a different note.', 'Los músicos practican patrones para entrenar sus oídos. Un patrón como Do, Re, Mi, Re, Do sube y vuelve. Los patrones enseñan a tu voz a cambiar de dirección con suavidad, algo que las canciones reales hacen todo el tiempo. Empieza despacio. Cuando un patrón sea fácil, prueba empezarlo en otra nota.', { play:[0, 2, 4, 2, 0, null, 4, 5, 7, 5, 4], keys:true }),
    LS('Echo singing', 'Cantar en eco', 'In echo singing, you listen to the whole pattern first, hold it in your mind, and then sing it back. This trains your memory for pitch, which is one of the most useful skills a worship singer can have. If you forget a note, do not panic. Listen again and try once more.', 'En el canto en eco, escuchas todo el patrón primero, lo guardas en tu mente y luego lo cantas de vuelta. Esto entrena tu memoria del tono, que es una de las habilidades más útiles que puede tener un cantante de alabanza. Si olvidas una nota, no te asustes. Escucha otra vez y vuelve a intentar.')
  ],
  pq:pq6, tq:tq6,
  tiers:[
    { goal:8, d:b('Practice 1. Walk down five notes, from Sol to Do.', 'Práctica 1. Baja cinco notas, de Sol a Do.'), g:mixQ(pq6, .15, () => SING([7, 5, 4, 2, 0], { tol:52, hold:.7 })) },
    { goal:10, d:b('Practice 2. Patterns that go up and turn around.', 'Práctica 2. Patrones que suben y dan la vuelta.'), g:() => SING(pk([[0, 2, 4, 2, 0], [4, 2, 0, 2, 4], [0, 2, 4, 5, 4, 2, 0]]), { tol:48, hold:.65 }) },
    { goal:14, d:b('Practice 3. Hear the pattern, then sing it back from memory.', 'Práctica 3. Escucha el patrón y cántalo de vuelta de memoria.'), g:() => SING(pk([[4, 5, 7, 5, 4, 2, 0], [0, 4, 2, 5, 4, 0], [7, 5, 4, 2, 4, 5, 7]]), { tol:45, hold:.6, echo:true }) }
  ],
  testGen:() => [SING([7, 5, 4, 2, 0], { tol:45 }), SING([0, 2, 4, 2, 0], { tol:45, echo:true }), SING([4, 5, 7, 5, 4], { tol:45, echo:true })]
});

/* ---------- L7 Intervals and jumps ---------- */
const pq7 = [
  Q('Do to Sol is a...', 'De Do a Sol es una...', [['Fifth', 'Quinta'], ['Third', 'Tercera'], ['Octave', 'Octava']], 0, 'Counting Do Re Mi Fa Sol gives five, so it is a fifth.', 'Contando Do Re Mi Fa Sol salen cinco, así que es una quinta.'),
  Q('Do to Mi is a...', 'De Do a Mi es una...', [['Third', 'Tercera'], ['Fifth', 'Quinta'], ['Octave', 'Octava']], 0, 'Counting Do Re Mi gives three, so it is a third.', 'Contando Do Re Mi salen tres, así que es una tercera.'),
  Q('An octave is...', 'Una octava es...', [['The same note, higher or lower', 'La misma nota, más aguda o más grave'], ['Two steps', 'Dos pasos'], ['A half step', 'Un medio paso']], 0, 'An octave is eight notes up: the same note name again, like a twin.', 'Una octava son ocho notas: el mismo nombre de nota otra vez, como un gemelo.')
];
const tq7 = [
  Q('From low Do to high Do is a(n)...', 'De Do grave a Do agudo hay una...', [['Octave', 'Octava'], ['Third', 'Tercera'], ['Fifth', 'Quinta']], 0),
  Q('Which jump is the biggest?', '¿Cuál salto es el más grande?', [['Octave', 'Octava'], ['Third', 'Tercera'], ['Fifth', 'Quinta']], 0),
  QM('Which statements are correct (counting Do as 1)?', '¿Cuáles afirmaciones son correctas (contando Do como 1)?', [['Do to Mi is a third', 'De Do a Mi es una tercera'], ['Do to Sol is a fifth', 'De Do a Sol es una quinta'], ['Do to Re is a fifth', 'De Do a Re es una quinta'], ['Do to high Do is an octave', 'De Do a Do agudo es una octava']], [0, 1, 3]),
  Q('Do to Sol is ___ than Do to Mi.', 'De Do a Sol es ___ que de Do a Mi.', [['Bigger', 'Más grande'], ['Smaller', 'Más pequeño'], ['The same size', 'Del mismo tamaño']], 0),
  Q('Before singing a jump, you should...', 'Antes de cantar un salto, debes...', [['Hear the note in your head', 'Oír la nota en tu cabeza'], ['Slide up to it from far below', 'Deslizarte hacia ella desde muy abajo'], ['Whisper', 'Susurrar']], 0),
  QM('Which are good tips for jumps?', '¿Cuáles son buenos consejos para los saltos?', [['Breathe first', 'Respirar primero'], ['Imagine the note before you sing', 'Imaginar la nota antes de cantar'], ['Scoop up from below', 'Deslizarte desde abajo'], ['Aim for the middle of the note', 'Apuntar al centro de la nota']], [0, 1, 3]),
  Q('An interval is the ___ between two notes.', 'Un intervalo es la ___ entre dos notas.', [['Distance', 'Distancia'], ['Volume', 'Volumen'], ['Name', 'Nombre']], 0),
  Q('Counting Do Re Mi, Do to Mi is a...', 'Contando Do Re Mi, de Do a Mi hay una...', [['Third', 'Tercera'], ['Second', 'Segunda'], ['Fifth', 'Quinta']], 0),
  QM('Which statements are TRUE?', '¿Cuáles afirmaciones son VERDAD?', [['Intervals measure distance', 'Los intervalos miden distancia'], ['A fifth is bigger than a third', 'Una quinta es más grande que una tercera'], ['An octave sounds like the same note', 'Una octava suena como la misma nota'], ['A third is bigger than an octave', 'Una tercera es más grande que una octava']], [0, 1, 2])
];
LEVELS.push({ id:7, sec:2, pass:85,
  name:b('Intervals and Jumps', 'Intervalos y saltos'),
  desc:b('Measure the distance between notes: thirds, fourths, fifths, and octaves. Then sing the jumps.', 'Mide la distancia entre notas: terceras, cuartas, quintas y octavas. Luego canta los saltos.'),
  lesson:[
    LS('Distance between notes', 'Distancia entre notas', 'The distance between two notes is called an interval. We name an interval by counting the note names, including the first one. Do to Re counts two, so it is a second. Do to Mi counts three, so it is a third. Do to Sol counts five, so it is a fifth. Do to the high Do counts eight, so it is an octave.', 'La distancia entre dos notas se llama intervalo. Nombramos un intervalo contando los nombres de las notas, incluyendo la primera. De Do a Re cuenta dos, así que es una segunda. De Do a Mi cuenta tres, así que es una tercera. De Do a Sol cuenta cinco, así que es una quinta. De Do al Do agudo cuenta ocho, así que es una octava.', { play:[0, 2, null, 0, 4, null, 0, 7, null, 0, 12], keys:true }),
    LS('Hear the sizes', 'Escucha los tamaños', 'A third is a small, sweet leap. A fourth is a medium leap. A fifth is a big, open, strong leap. An octave is the biggest, and it sounds like the same note, higher. Many songs begin with one of these jumps. If you can hear the size, you can sing it without a piano.', 'Una tercera es un salto pequeño y dulce. Una cuarta es un salto mediano. Una quinta es un salto grande, abierto y fuerte. Una octava es el más grande, y suena como la misma nota, más aguda. Muchas canciones comienzan con uno de estos saltos. Si puedes oír el tamaño, puedes cantarlo sin piano.', { play:[0, 4, null, 0, 5, null, 0, 7], keys:true }),
    LS('How to sing a jump', 'Cómo cantar un salto', 'First, hear the target note in your head before you sing it. Take a breath. Then place your voice right on the note. Do not scoop up from below to find it, and do not creep up on it. Aim for the middle of the note. If you miss, adjust a little and hold, then try again.', 'Primero, oye la nota objetivo en tu cabeza antes de cantarla. Toma aire. Luego coloca tu voz justo en la nota. No te deslices desde abajo para encontrarla, ni te le acerques poco a poco. Apunta al centro de la nota. Si fallas, ajusta un poco y mantén, y luego vuelve a intentar.'),
    LS('Where you meet jumps', 'Dónde encuentras los saltos', 'In worship songs, jumps usually happen at the start of a phrase or when the chorus lifts. They are what makes a melody feel exciting. Singers who can hit jumps cleanly sound confident, and the congregation can follow them more easily. This is where pitch training really pays off.', 'En las canciones de alabanza, los saltos suelen ocurrir al comienzo de una frase o cuando el coro se eleva. Son lo que hace que una melodía se sienta emocionante. Los cantantes que logran los saltos con limpieza suenan seguros, y la congregación los puede seguir con más facilidad. Aquí es donde el entrenamiento del tono da más resultado.')
  ],
  pq:pq7, tq:tq7,
  tiers:[
    { goal:6, d:b('Practice 1. Listen to two jumps. Was the second one bigger or smaller?', 'Práctica 1. Escucha dos saltos. ¿El segundo fue más grande o más pequeño?'), g:mixQ(pq7, .2, () => earBigger()) },
    { goal:10, d:b('Practice 2. Sing a jump of a third, a fourth, and a fifth.', 'Práctica 2. Canta un salto de tercera, de cuarta y de quinta.'), g:() => SING(pk([[0, 4], [0, 5], [0, 7], [2, 7], [0, 4, 7]]), { tol:50, hold:.7 }) },
    { goal:14, d:b('Practice 3. Jumps up and down, sung from memory.', 'Práctica 3. Saltos hacia arriba y hacia abajo, cantados de memoria.'), g:() => Math.random() < .25 ? earBigger() : SING(pk([[0, 7, 4], [0, 4, 7, 4, 0], [7, 0, 5], [4, 0, 7, 0]]), { tol:45, hold:.6, echo:true }) }
  ],
  testGen:() => [earBigger(), earBigger(), SING([0, 4, 0], { tol:45 }), SING([0, 7, 0], { tol:45 }), SING([0, 5, 9], { tol:45 }), SING([0, 4, 7, 4, 0], { tol:45, echo:true })]
});
})();
