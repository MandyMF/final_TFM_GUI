# TFM GUI
This project makes use of the git repo **https://github.com/MandyMF/BabelMatcherTFM.git** branch  **relative_imports** as a submodule. As a base the **pywebview-react-boilerplate** was used.

## Requirements
- Python 3
- Node (recommended v16.17.1)
- virtualenv
- yarn (recommended)

## Installation

``` bash
yarn run init
```
then
``` bash
yarn run init:windows
```
on windows.

This will create a virtual environment, install pip and Node dependencies. Alternatively you can perform these steps manually.

``` bash
npm install
pip install -r requirements.txt
```

On Linux systems installation system makes educated guesses. If you run KDE, QT dependencies are installed, otherwise GTK is chosen. `apt` is used for installing GTK dependencies. In case you are running a non apt-based system, you will have to install GTK dependencies manually. See [installation](https://pywebview.flowrl.com/guide/installation.html) for details.

## Usage

To launch the application.

``` bash
yarn run start
```

To build an executable. The output binary will be produced in the `dist` directory.

``` bash
yarn run build
```
or
``` bash
yarn run build:windows
```
on windows.

``` bash
yarn run build:linux
```
on linux.

To start a development server (only for testing frontend code).


``` bash
yarn run dev
```
on windows.
