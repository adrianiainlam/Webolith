from fabric.api import env, run,roles,cd, settings
import os

env.key_filename= os.getenv("HOME") + "/Dropbox/aws/cesarkey.pem"
env.roledefs = {
    'prod': ['ec2-user@aerolith.org']
}

@roles('prod')
def deploy_prod():
    with settings(warn_only=True):
        run("kill `cat /home/ec2-user/webolith/gunicorn.pid`")  # kill the gunicorn process
    with cd("webolith"):
        run("git pull")
        with cd("djAerolith"):
            with settings(warn_only=True):
                run("mkdir logs")
            run("python manage.py collectstatic --noinput")  # collect static files!
            run("python manage.py migrate") # execute any needed migrations
            run("python manage.py run_gunicorn --config ../gunicornConf.py --daemon")

@roles('prod')
def test_prod():
    with cd("webolith/"):
        with cd("djAerolith/"):
            run("ls -al")
