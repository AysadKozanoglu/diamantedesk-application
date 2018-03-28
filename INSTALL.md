
Installation Guide

DiamanteDesk may serve as an independent end-user application or as an extension for OroCRM. It will also be available for other CRMs in the nearest future.

This section provides detailed instructions on various options of DiamanteDesk application installation.
Requirements

DiamanteDesk application was built using Symfony 2.3 framework and Oro Platform; therefore, all the prerequisites listed as Symfony and Oro system requirements also refer to DiamanteDesk.

DiamanteDesk Requirements:

    app/attachments folder needs to be writable;
    DiamanteDesk uses Composer to manage package dependencies. To learn more about the composer and download it from the official website, follow this link;
    MySQL database server with an empty database.

Optionally, providing that your portal should be customized, your system shall comply with additional requirements:

    NPM package manager needs to be installed;
    Grunt needs to be installed (globally);
    Bower needs to be installed (globally).

You can also check whether your system meets all the requirements from the command line. In order to do that, you should start with getting the application code from Github and install required libraries. Next, run the following command:

php app/check.php

Web Server configuration

DiamanteDesk application was developed on the basis of the Symfony standard application so you can learn more about web server configuration recommendations here.

Note: DiamanteDesk makes heavy use of HTTP methods in RESTful calls. The server can be configured to block some of them (for example, PUT, DELETE, etc.). However, this limitation should be removed, otherwise, a certain part of application will not function properly.
Email Notification Configuration

DiamanteDesk provides email notification functionality to automatically confirm user accounts, inform customers when new tickets are created or about any changes made to existing ones. This way a customer is notified whether his request is being processed.

To make sure this functionality works properly, pay attention to email notification configuration:

    When installing DiamanteDesk via the web wizard, fill out the Mailer Settings section of the Configuration step.
    If DiamanteDesk was installed through the console, provide the required configuration data at the app/config/parameters.yml directory.

Installation of a Standalone Application
Step 1: Get the Stable Version of the Application

Three options to get the latest stable version are available:

Option 1: Using Git

git clone -b 1.0 https://github.com/eltrino/diamantedesk-application

Option 2: With the composer package manager

php composer.phar create-project diamante/desk-application

Option 3: Via a release archive

The release archive is built for every stable release and it comes with the so-called “batteries included” as all the requirements are already installed and all the resources are built. Simply download the package, unzip it to the web-accessible directory on your server and follow the installation steps described in the following section.

curl -O https://github.com/eltrino/diamantedesk-application/releases/download/2.0.0/diamantedesk-application-full-2.0.0.zip

unzip diamantedesk-application.zip

Note: Generally, we do not recommend using the last option and consider it to be a fallback option in case you have only FTP access to your server.

Learn how to get the latest development version of the application here.
Step 2: Install the Required Libraries

Install the dependencies with the composer:

php composer.phar install

Step 3: Create a Database

To install DiamanteDesk you also need to setup MySQL database server with an empty database that will be used later on. Use the following command:

php app/console doctrine:database:create

Step 4: Install the Application

The application can be installed either using a console or via a web wizard. Select the most suitable version:

Option 1: Installation Using a Console

To run the installation of DiamanteDesk in a console mode, use the following command:

php app/console diamante:install

Additional commands may be required. The system will guide you through the process with questions and command options.

If the system configuration does not meet the requirements, the install command provides corresponding messages. In case there are any issues, fix them and run the command again.

Option 2: Installation Using Web Wizard

To install the application through a web wizard, follow the link below:

http://localhost/install.php

After the DiamanteDesk installation screen opens, click Begin Installation.

Firstly, installation wizard automatically checks system requirements.

In case there are any issues, fix them and refresh the page. After all system configurations meet installation requirements, click Next.

Background Job Configuration

DiamanteDesk requires that certain task should be executed in background. For this you will need to add several commands to your system job scheduler.

*/1 * * * * php app/console diamante:cron > /dev/null

This will execute required command every minute. If you need you can change execution period to 5 minutes. This will decrease system reaction time to certain events (for example processing rules).

Also if you would like to use Email channel its required to add one of the commands described in this section to your system job scheduler.
