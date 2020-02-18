+++
title = "Week 3"
date = "2020-02-17T22:39:31-05:00"
draft = false
image = "img/week3/out.gif"
+++

This week I built a drawing machine. I was initially inspired by
[spirographs](https://www.youtube.com/watch?v=Ge4wDrz-FhE) that I used to
have as a kid and wanted to make an automated, mechanical form of these.
After exploring Pinterest spirographs to see if there were particularly
interesting patterns I could create, I found
[this](http://leafpdx.bigcartel.com/product/cycloid-drawing-machine)
drawing machine that costs $675!! The pattern combinations were very
complex and customizable so I set out to make something similar at a much
lower price point.

### Grinding my Gears

I started by trying to get just two gears to move together. Before making
any gears I needed an axis. In order to fix these axes to some base board
down the line, I decided to use screws. I used calipers to measure the
width of several screws and settled on the 10-32 screws.

![screw width](/img/week3/screw_width.png)

I chose this screw because the width as measured with the calipers was
close to the width of cardboard, which would give me flexibility later in
designing the drawing arm (I could make a slot that would fit snugly to
both a screw and cardboard). We also had many lengths for this screw type
in the lab so I had flexibility in axis heights.

To determine how large I should make my holes to allow the gears to spin,
I made a bar with several holes in Fusion that varied up to 0.20mm in
diameter from the measured screw width:

![hole size](/img/week3/hole_size.png)
![hole size second](/img/week3/hole_size_2.png)

I found that 4.75mm was a reasonable hole size, accounting for kerf, to
use as a center hole diameter in my gears. To actually make the gears,
I followed [this](https://www.youtube.com/watch?v=ZakT54JIhB8) tutorial
that lead me to a script built in to fusion.

![gear params](/img/week3/gear_params.png)

I had several choices in the parameters. I chose a small pressure angle to
give the gear less horsepower but also less noise, which I thought would
result in smoother drawings. The module and number of teeth together
determine the pitch diameter. In order to find good values for these
parameters, I had to plan out my design a little further.

I wanted to be able to mount a full piece of printer paper on the table of
my machine.  This would have a diameter of $\sqrt{8.5^2+11^2}=13.9
in\approx 353.06 mm$. In order to have a gear with a hand crank that
I could interlock with a gear for the table, I needed to have the hand
crank gear fully clear the table so that the crank wouldn't bump into the
table. I needed a gear setup with teeth $353.06/2=176.50mm$ from center.
I could do this with one big gear, but with limited cardboard and wood,
bigger pieces are harder to cut out. I decided to split this radius into
two gears. I split this larger radius into a center gear of radius 80mm
and an outer gear of radius approximately 48mm, somewhat arbitrarily. Note
that $r_\text{center}+2r_\text{outer}\approx 176.50 mm$ so that the teeth
of the outer gear will be around the border of the table and the hand
crank will not hit the table. The diameter of a gear is the module times
the number of teeth. I wanted gears with diameter 96mm and 160mm so
I chose module to be 2 to get nice, whole numbers of teeth (48 and 80).
Module affects the compatibility of gears so I kept module at 2 throughout
construction of all my gears.

To get my two gears to work together I made small, 24 tooth gears. With
module 2, these had a pitch diameter of 48mm. Running the script generated
a body for me:

![24 Tooth Gear](/img/week3/24_gear_basic.png)

The sketches for this body were not fully constrained or parameterized
(e.g. the hole diameter at the center, which I had set as a parameter to
4.75, was not linked to the parameter in the resulting body). This was
mildly annoying and I'm interested to learn if there is something about
writing scripts that prevents this or if it is just more complicated.

### Building a Base

With the gears interlocking and spinning on screws, I set out to make
a cardboard base that held axes at the distances I calculated above.
I created fixed points for the axis of the center gear and 3 outer gears,
all of which would lie fully under the table. I also created flexible axis
locations for 3 other gears that would be turned by the outer gears.
I used the slot tool to allow these gears to be easily repositioned and to
allow customization by swapping gear sizes. The final design looked like
this:

![base](/img/week3/base_design.png)

I printed gears with the 80 and 48 teeth and assembled everything:

![base](/img/week3/base.gif)

To affix the screw axes to the base I used a washer and nut and then
placed the gear on top of this. One problem with the approach is that the
gears were very wobbly. To remedy this, I designed and laser cut a spacer
with a hole in the middle that was just larger than the hex nut on each
axis:

![spacer](/img/week3/spacer.png)

Putting one below each gear made the configuration much less wobbly,
though the cardboard gears still sometimes skipped. Once the base setup
was complete I needed another type of gear. In order to insert a handle
into a gear, I added a slot in the middle of the gear and then used Fusion's
push/pull feature on the existing gear body to cut a hole shaped like this
slot. This slot had a width equal to the axis holes as I planned to use
the same type of screw. I made the slot as long as possible, which
interfered with the spacer, so I made a slightly smaller spacer as well
for these slotted gears.

![slotted gear dims](/img/week3/slotted_gear_dimensions.png)
![slotted gear](/img/week3/slotted_gear.png)

These gears fit well onto the base. With this in place I needed a way to
attach the arm that would hold the pen.

### Drawing Arm

To hold the drawing arm on the handles of two gears, I created two types
of screw caps that would rest on the handles coming from the slotted gears
above. One cap had a rod sticking out (which I found in our miscellaneous
hardware bin) while the other used another piece of cardboard.

![screw caps](/img/week3/screw_caps.jpg)

I designed a bar that would hinge on the rod and slide the cardboard cap
through a slot:

![bar](/img/week3/bar_1.png)

In the end, however, I removed the screw caps as I found the bar worked
better just resting on nuts and the screws. For this I designed an
alternative bar. The slots at the end of this bar allow it to be used for
both a screw/screw combination or a screw cap/screw cap combination, with
both caps using cardboard and not the rod above:

![bar alt](/img/week3/bar_2.png)


Finally, I made a box to hold the pen with a pen hole large enough for
a sharpie, pencil, or pen. I added a hole in the side that would allow me
to tighten a screw to hold the writing utensil in place:

![pen box](/img/week3/pen_box.png)

I extended the base of the box to make a second arm and attached the two.

### Table

The last step was adding a table to the center gear. I added slots to the
center gear and made a large circle with similar slots. I connected the
two pieces with two laser cut connectors as shown below:

![table_connector](/img/week3/table_connector.png)
![table](/img/week3/table.png)

Putting it all together, I found the cardboard gears kept slipping with
the weight and friction of the full assembly. To fix this, I simply
printed acrylic gears (we were all out of wood) and came up with the
following working product:

![angled shot](/img/week3/angled_full.jpg)
![final product](/img/week3/drawing_machine.jpg)
![first drawing](/img/week3/design.jpg)

![result](/img/week3/out.gif)

The machine draws as hoped, though I would like to cut more diverse gears
to make more diverse patterns. I might also make a different base shape to
allow further flexibility. One problem with the current design is that the
gears are still wobbly sometimes when going fast. Adding a guard over gear
intersections could help solve this.
