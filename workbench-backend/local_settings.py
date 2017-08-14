cliendID = ''
secret = ''

esgf_slcs_serve = ''
# authorize_url = "{}/esgf-slcs/oauth/authorize".format(esgf_slcs_server)
# token_url = "{}/esgf-slcs/oauth/access_token".format(esgf_slcs_server)
# certificate_url = "{}/esgf-slcs/oauth/certificate/".format(esgf_slcs_server)
import os

if os.environ.get('TRAVIS') == 'true':
    userdata_storage_path = '.'
else:
    userdata_storage_path = '/Users/' + os.environ['USER'] + '/projects/acme_workbench/userdata/'
