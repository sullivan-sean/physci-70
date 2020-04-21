+++
title = "Final Project Idea"
date = "2020-04-18T15:56:31-05:00"
draft = false
image = "img/week11/handle_full.png"
+++

## Workout Tracking

Expanding on the force sensor I built last week, for my final project,
I will be building a smart jump rope. While this is a produce that does
exist, I am not satisfied with what is out there. Many of these products
are simple mechanical counters and others are much more complicated,
flashing a strip of LEDs in the air as you swing so you can see your
repetitions. The former does not provide all of the features I want out of
smart workout equipment and the latter is poorly designed/expensive.

I would like a product that can measure the frequency of jumps and
intensity of my workouts, and track progress over time. There are several
things I will need to build for this that will combine what I have learned
about 3D modeling and print, sensors, wireless communication/IoT, and
APIs/programming. The end product will consist of an microcontroller
circuit in a custom built handle for my jump rope that records information
throughout my workout. After the workout is complete, which I will
indicate with a button press, the information will be transmitted to my
phone where it will be loaded into an app that backs this data up to
a database.

Here's a list of what I will need for the project (a bill of materials):

- 3D printed housing
- Huzzah ESP32 board
- Accelerometer/gyroscope
- Infrared LED
- Other miscellaneous components (wires, resistors, etc.). This will
    become clear as I fully flesh out the circuit

Data will be read from the accelerometer to determine how the rope is
moving (to detect frequency of swings, number of swings, double unders,
cross overs, etc.), while the Infrared LED can be used for heart rate
monitoring as shown [here](https://www.instructables.com/id/Simple-DIY-Pulse-Sensor/).

## Project Plan

This week I will start out by designing the housing for my project.
I already have a hollow jump rope handle but it is not quite large enough
to house the esp32 board, which will be necessary for wireless
communication. I will use this handle to gather data using the ItsyBitsy
(which it is barely large enough to house). After I've gathered data,
I will be able to program everything and create slightly large 3D printed
housing for the Huzzah Esp32.

To construct appropriate housing, I used parametric design in Fusion 360.
The handle itself measured about 150mm:

![handle_len](/img/week11/handle_len.jpg)

This handle has an ergonomic design that is nice to hold, and a screw on
cap on the left hand end that can be unscrewed to insert weights.
A bearing sits in the right hand end for smooth turning of the jump rope.
When modeling, I had to keep in mind the inner and outer diameters of the
handle as well, which I measured at (approximately) 20mm and 30mm
respectively. I also looked up the bearing model which was a [608zz
bearing](https://www.amazon.com/Bearing-Shielded-8x22x7-Miniature-Bearings/dp/B002BBICBK)
measuring 8x22x7, for inner diameter, outer diameter, and width respectively.

Finally, I measured the limiting dimensions of the Huzzah, ItsyBitsy and
accelerometer boards:

<div style="display:flex;flex-direction:row">
<img src="/img/week11/esp32_len.jpg" />
<img src="/img/week11/itsy_bitsy_len.jpg" />
<img src="/img/week11/accel_len.jpg" />
</div>

Note that the board cannot site directly at the diameter either because of
the header pins. It will take a little bit of trigonometry to figure out
what inner diameter I should use in my own handle for both the itsy bitsy
and the feather.

To begin with, I designed the general shape in fusion, with flexibility to
change parameters after doing calculations. I did not make the design very
ergonomic to begin with and focused on the bare MVP for a first prototype:


![handle_full](/img/week11/handle_full.png)

At the left end, I have a removable, press fit cap:
![handle_cap_end](/img/week11/handle_cap_end.png)
![handle_cap](/img/week11/handle_cap.png)
![handle_cap](/img/week11/handle_cap.png)

The other end of the handle has an inset for the bearing:

![handle_bearing_end](/img/week11/handle_bearing_end.png)

The insets and fillets here make this piece best created by 3D printing.

## Next Steps

Going forward, my next steps will be to figure out exactly what my circuit
will look like and start gathering data on the ItsyBitsy in the handle
that I have already. I will need to develop an algorithm to tranform the
accelerometer data into something more usable for my purposes. I will also
need to just store this data on the microcontroller flash chip itself as
the ItsyBitsy cannot communicate via bluetooth or wifi to my
phone/computer. Concretely I will:

- Design a circuit for the accelerometer
- Gather data and create an algorithm to transform accelerometer data to repetitions
- Create a mobile interface and get the ESP32 communicating directly with
    my custom phone app
- Modify housing to be more ergonomic and contain explicit holding areas
    for components
