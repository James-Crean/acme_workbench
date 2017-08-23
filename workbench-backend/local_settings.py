client_id = '...'
secret = '...'

esgf_slcs_server = 'pcmdi11.llnl.gov'
authorize_url = "{}/esgf-slcs/oauth/authorize".format(esgf_slcs_server)
token_url = "{}/esgf-slcs/oauth/access_token".format(esgf_slcs_server)
certificate_url = "{}/esgf-slcs/oauth/certificate/".format(esgf_slcs_server)
redirect_url = 'http://localhost:8000/oauth_calback'

globus_client_id = '...'
globus_client_secret = '...'
globus_redirect_url = '...'
