import matplotlib.pyplot as plt
import numpy as np

forces = np.loadtxt('force.txt')
temps = np.loadtxt('temps.txt')

fx = np.arange(len(forces)) * 10
tx = np.arange(len(temps)) * 500

plt.plot(fx, forces / forces.max())
plt.title('Force over Time')
plt.ylabel('% Force of max')
plt.xlabel('Time (ms)')
plt.savefig('force_plot.png')
plt.close()

plt.plot(tx, temps)
plt.title('Temperature over Time')
plt.ylabel('Temperature (F)')
plt.xlabel('Time (ms)')
plt.savefig('temp_plot.png')
plt.close()
