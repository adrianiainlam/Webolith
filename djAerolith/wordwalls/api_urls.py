# Aerolith 2.0: A web-based word game website
# Copyright (C) 2011 Cesar Del Solar
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# To contact the author, please email delsolar at gmail dot com

from django.conf.urls import url

from wordwalls.api import (
    api_challengers,
    configure,
    challenges_played,
    get_challenge_questions,
    special_challenges,
    default_lists,
    new_challenge,
    new_search,
    load_aerolith_list,
    load_saved_list,
    load_raw_questions,
)

urlpatterns = [
    url(r'^challengers/$', api_challengers),
    url(r'^configure/$', configure),
    url(r'^challenges_played/$', challenges_played),
    url(r'^special_challenges/$', special_challenges),
    url(r'^default_lists/$', default_lists),
    url(r'^new_challenge/$', new_challenge),
    url(r'^new_search/$', new_search),
    url(r'^load_aerolith_list/$', load_aerolith_list),
    url(r'^load_saved_list/$', load_saved_list),
    url(r'^load_raw_questions/$', load_raw_questions),

    url(r'^get_challenge_questions/$', get_challenge_questions),
    # url(r'^getNewSignature/$', 'wordwalls.views.get_new_signature',
    # name='get_new_signature')
]
