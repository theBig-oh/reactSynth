### React Synthesizer

  
***Still in development***


A simple additive synthesizer made using javascript's native Web Audio API and ReactJS. 


Made to be used with an actual computer or laptop keyboard. 

***Mobile version in development***


## How To Use

--- Making music

The piano keys are binded to your keyboard. 

         Keyboard  keys            =    Music notes
     7 8   0 - +  /  A S   F G H   =  C# D#   F# G# A#
    Y U I O P [ ] / Z X C V B N M  = C  D  E F  G  A  B


You can also go an octave higher or lower using the shift + one of the keys above


     Shift + Z = C3 (A "C" an octave lower)
     Shift + Y = C6 (A "C" an octave higher)

--- Changing waveform type

You can change the type of wave by pressing the 
(Below is the generalization for the type of sound each creates)

    Sine 
    - Used for bell sounds
    Square
    - Retro 8-bit type of sounds
    Triangle
    - Clave sounds, can possibly do some Deep purple tracks using it
    Sawtooth 
    - Synthwave-y type of sounds. 

buttons below the "Master Volume" slider.


--- ADSR 

The synth has a very basic ADSR (Attack, Decay, Sustain, Release). 

You can use the arrows under each one to adjust the value of the targetted ADSR value.

   -- Quick overview of ADSR

ADSR is a function that adjusts the sound volume of the wave/note being played. 
Below shows a very basic wave being adjusted.

       V |       A
       O |      A D
       L |     A   D
       U |    A     D S S S S R   
       M |   A                 R         - Normal 
       E |  A                   R
         | A                     R
          ----------------------------
          TIME                         
       V | A      
       O | A D
       L | A  D
       U | A   D S S S S R               - Attack set to 0.0ms
       M | A               R
       E | A                 R
         | A                   R
          ----------------------------
          TIME               
       V |       A
       O |      A D
       L |     A  D
       U |    A    S S S S S S R 
       M |   A                  R       - Decay set to 0.0ms
       E |  A                    R
         | A                      R
          ----------------------------
          TIME               
       V |       ADS S S S S 
       O |      A           R
       L |     A             R          - Sustain set to 1. (100% of master volume) 
       U |    A               R
       M |   A                 R
       E |  A                   R
         | A                     R
          ----------------------------
          TIME    
       V |       A
       O |      A D
       L |     A   D
       U |    A     D S S S S R         - Release set to 0.0ms
       M |   A                R 
       E |  A                 R  
         | A                  R   
          ----------------------------
          TIME                          
          A = Attack (Time value to Master Volume )
          D = Decay   ( Time value to Sustain value )
          S = Sustain ( Level value which is set to a percentage of the master volume )
          R = Release  ( Time value to set the volume to 0 once note is released )


Please try it yourself to understand it further.

