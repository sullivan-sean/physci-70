+++
title = "Week 5"
date = "2020-02-28T15:56:31-05:00"
draft = false
image = "img/week5/ball_bearing.jpg"
+++

## Preliminary Research

Before diving in this week, I watched many Youtube videos and found many
sites for 3D Printing Inspiration that I'd like to share and be able to
come back to myself.

### Resources

Several of the resources I've explored this week are

- [r/3Dprinting](https://www.reddit.com/r/3Dprinting/) for functional and creative 3d print inspiration
  - They have a great
      [guide](https://www.reddit.com/r/3DPrinting/wiki/makingmodels) on modeling
- [Hinges](https://www.youtube.com/watch?v=7JhjhgjchfM) that print in place
- [RepRap](https://reprap.org/wiki/RepRap) self-replicating printers


### Other Cool things

One cool thing about 3D Printers that I found are _print in-place_
mechanisms. In a single print, you are able to produce joints, gears, and
[other
mechanisms](https://ult3d.com/3d-printing-assemblies-no-assembly-required/).
Compared to the other fabrication methods I've seen this seems unique to
3d printing.

This
[robot](https://www.slashgear.com/3d-printed-robot-requires-no-assembly-also-has-liquid-parts-07435201/)
is one example of a print that requires no assembly but functions fully
with the addition of a single battery and motor.

Some things I think would be cool to build with a 3d printer in the future
is a 3d printer (see [RepRap](https://reprap.org/wiki/RepRap) above), as
well as a custom build laptop. There are concerns about cooling for this
so I'm not sure what the best material to use for this would be. An
alternative that I might pursue before a full laptop is a raspberry pi
setup as my next computer, with a small LCD screen and foldable keyboard.
The [Raspberry Pi
4](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) now comes
with an option for 4GB of RAM which I think could serve my everyday
computing needs. For this project I would print a case to hold the screen
to the board, slots to cover ports, and a compartment below the board for
the foldable keyboard.


## Prints

My first attempt at a print this week was a bottle opener. I planned to
make a virus shaped bottle opener for Corona bottles. After constructing
an initial iteration, Prusa estimated a print time of 8 hours!! I shrunk
the model and it still took several hours so I started by making the
opener component to see if the opener would actually work.

### Bottle Opener

I first took a picture of a bottle opener I had and used it as a canvas in
fusion:

![opener](/img/week5/opener.png)

After extruding this, I exported the component as an STL and imported it
to Prusa slider. I set it on its top and tried printing without support
(no large overhangs) and with 50% infill so that it was sturdy against the
metal bottle cap.

![opener_upright](/img/week5/opener_upright.png)

This opener had filaments that broke easily when subject to the lever
force used to open the bottle and fractured after printing. Luckily
printing in another orientation had similar time and required no supports:

![opener_side](/img/week5/opener_side.png)

Unfortunately, even with this change, the opener wasn't sturdy enough to
open the bottles. Instead of continuing to pursue this, I decided to scrap
the opener part and just print a Corona Virus.

### Virus

I wanted to make a bacteriophage like virus that is easily identifiable
(even though Coronavirus is not a bacteriophage). These viruses have an
icosahedral head and several spiky legs coming out of their base.

I made a pentagonal pyramid with Fusion's loft feature.

![pentagon](/img/week5/pentagon.png)

Then joined two rotated pyramids with a cylinder and used Fusions slice
feature to cut off excess.

![ico_slice](/img/week5/ico_slice.png)

The result was what I was looking for:

![ico](/img/week5/ico.png)

To construct the bottom I made a cylinder and added a leg body, then used
the circular pattern feature to duplicate it several times:
![bottom](/img/week5/bottom.png)

I joined these two designs using design linking in fusion. I added
a cylinder to connect them and added an extruded SVG of the Corona logo to
cut the logo into the cylinder:

![virus_fusion](/img/week5/virus_fusion.png)

I tried two orientations in Prusa for printing this as  any orientation
required support:

![virus_side](/img/week5/virus_side.png)
![virus_upright](/img/week5/virus_upright.png)

I ended up choosing the upright orientation to avoid any scarring on the
identifiable icosahedral head. I used 0% infill to speed up printing.

After printing I ended up with lots of support:

![virus support](/img/week5/virus_scaffold.jpg)

And after cutting off the support there was some scarring on the base but
I'm overall happy with the result. The logo is still legible!!

![virus](/img/week5/virus.jpg)

### Picture Frame

Another project I wanted to make was a frame for the painting my
girlfriend made for me for Valentine's day. A basic frame that fit the
picture was too large for Prusa's bed:

![large_frame](/img/week5/large_frame.png)

Instead, I split the frame in two interlocking pieces:

![frame_fusion](/img/week5/frame_fusion.png)

This allowed me to print twice as fast on two printers as well!

![frame](/img/week5/frame_partial.jpg)

The interlocking joints came out well but the slot I left between for the
paper was filled with support so the frame was ultimately not usable.

### Ball Bearing

Finally, I wanted to expriment with print in place and so I made a ball bearing.


Finally, I wanted to expriment with print in place and so I made a ball
bearing.

Finally, I wanted to expriment with print in place and so I made a ball
bearing. 
![bearing_sketch](/img/week5/bearing_sketch.png)
![ball_bearing](/img/week5/ball_bearing.png)
![bearing_split](/img/week5/bearing_split.png)
![ball_bearing](/img/week5/ball_bearing.jpg)
