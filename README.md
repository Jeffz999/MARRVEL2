# MARRVEL

## About / Goal:
"MARRVEL (Model organism Aggregated Resources for Rare Variant ExpLoration) aims to facilitate the use of public genetic resources to prioritize rare human gene variants for study in model organisms. To facilitate the search process and gather all the data in a simple display we extract data from human data bases (OMIM, ExAC, ClinVar, Geno2MP, DGV, and DECIPHER) for efficient variant prioritization. The protein sequences for eight organisms (S. cerevisiae, S. pombe, C. elegans, D. melanogaster, D. rerio, M. musculus, R. norvegicus, and H. sapiens) are aligned with highlighted protein domain information via collaboration with DIOPT. The key biological and genetic features are then extracted from existing model organism databases (SGD, PomBase, WormBase, FlyBase, ZFIN, MGI, and RGD)."

## Install / Prepare to Run
1. Create the credential files below:
    * app/config/aws/{environment}.json
    
    ```json
    {
      "accessKeyId": "your key",
      "secretAccessKey": "your secret key"
    }
    ```
    * app/config/mongo/{environment}.json
    ```json
    {
      "host": "host",
      "port": "port",
      "user": "user name",
      "pwd": "password",
      "database": "database name for identification and retrieving data"
    }
    ```
    * app/config/omim/{environment}.json
    ```json
    "your omim key"
    ```
    * app/config/recaptcha/{environment}.json
    ```json
    "reCAPTCHA key"
    ```
2. Install Python packages `requirements.txt` and run setupTransVar.sh to install and configure TransVar.
    ```sh
    $ pip install -r requirements.txt
    $ ./setupTransVar.sh
    ```
3. Install packages with npm:
    ```sh
    $ npm install
    ```
## Build
Command to build
```sh
$ ng build --prod
```

## Run
Command to run the server:
```sh
$ node app
```

